"use client"

import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export interface SaleRecord {
  id: string
  customerName: string
  productName: string
  quantity: number
  pricePerUnit: number
  total: number
  paymentMode: "Cash" | "UPI" | "Pending"
  date: string
}

export interface Product {
  id: string
  name: string
  stock: number
}

export interface Customer {
  id: string
  name: string
  phone: string
  totalPurchases: number
}

export interface Payment {
  id: string
  customerName: string
  amount: number
  paymentMode: "Cash" | "UPI" | "Pending"
  status: "Paid" | "Pending"
}

interface AppState {
  isLoggedIn: boolean
  currentPage: string
  sales: SaleRecord[]
  products: Product[]
  customers: Customer[]
  payments: Payment[]
  login: () => void
  logout: () => void
  setCurrentPage: (page: string) => void
  addSale: (sale: Omit<SaleRecord, "id" | "date">) => void
  addProduct: (product: Omit<Product, "id">) => void
  updateProductStock: (id: string, stock: number) => void
}

const initialProducts: Product[] = [
  { id: "p1", name: "Rice (1kg)", stock: 45 },
  { id: "p2", name: "Sugar (1kg)", stock: 8 },
  { id: "p3", name: "Oil (1L)", stock: 22 },
  { id: "p4", name: "Wheat Flour (1kg)", stock: 5 },
  { id: "p5", name: "Tea (500g)", stock: 30 },
  { id: "p6", name: "Salt (1kg)", stock: 3 },
  { id: "p7", name: "Soap", stock: 60 },
  { id: "p8", name: "Detergent (1kg)", stock: 12 },
]

const initialSales: SaleRecord[] = [
  { id: "s1", customerName: "Ravi Kumar", productName: "Rice (1kg)", quantity: 5, pricePerUnit: 55, total: 275, paymentMode: "Cash", date: "2026-02-08" },
  { id: "s2", customerName: "Priya Sharma", productName: "Oil (1L)", quantity: 2, pricePerUnit: 140, total: 280, paymentMode: "UPI", date: "2026-02-08" },
  { id: "s3", customerName: "Amit Patel", productName: "Sugar (1kg)", quantity: 3, pricePerUnit: 45, total: 135, paymentMode: "Pending", date: "2026-02-07" },
  { id: "s4", customerName: "Neha Gupta", productName: "Tea (500g)", quantity: 1, pricePerUnit: 180, total: 180, paymentMode: "Cash", date: "2026-02-07" },
  { id: "s5", customerName: "Ravi Kumar", productName: "Wheat Flour (1kg)", quantity: 10, pricePerUnit: 38, total: 380, paymentMode: "UPI", date: "2026-02-06" },
]

const initialCustomers: Customer[] = [
  { id: "c1", name: "Ravi Kumar", phone: "9876543210", totalPurchases: 655 },
  { id: "c2", name: "Priya Sharma", phone: "9876543211", totalPurchases: 280 },
  { id: "c3", name: "Amit Patel", phone: "9876543212", totalPurchases: 135 },
  { id: "c4", name: "Neha Gupta", phone: "9876543213", totalPurchases: 180 },
]

const initialPayments: Payment[] = [
  { id: "pay1", customerName: "Ravi Kumar", amount: 275, paymentMode: "Cash", status: "Paid" },
  { id: "pay2", customerName: "Priya Sharma", amount: 280, paymentMode: "UPI", status: "Paid" },
  { id: "pay3", customerName: "Amit Patel", amount: 135, paymentMode: "Pending", status: "Pending" },
  { id: "pay4", customerName: "Neha Gupta", amount: 180, paymentMode: "Cash", status: "Paid" },
  { id: "pay5", customerName: "Ravi Kumar", amount: 380, paymentMode: "UPI", status: "Paid" },
]

const AppContext = createContext<AppState | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [sales, setSales] = useState<SaleRecord[]>(initialSales)
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers)
  const [payments, setPayments] = useState<Payment[]>(initialPayments)

  const login = useCallback(() => setIsLoggedIn(true), [])
  const logout = useCallback(() => {
    setIsLoggedIn(false)
    setCurrentPage("dashboard")
  }, [])

  const addSale = useCallback((sale: Omit<SaleRecord, "id" | "date">) => {
    const newSale: SaleRecord = {
      ...sale,
      id: `s${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
    }
    setSales((prev) => [newSale, ...prev])

    // Update or add customer
    setCustomers((prev) => {
      const existing = prev.find(
        (c) => c.name.toLowerCase() === sale.customerName.toLowerCase()
      )
      if (existing) {
        return prev.map((c) =>
          c.id === existing.id
            ? { ...c, totalPurchases: c.totalPurchases + sale.total }
            : c
        )
      }
      return [
        ...prev,
        {
          id: `c${Date.now()}`,
          name: sale.customerName,
          phone: "-",
          totalPurchases: sale.total,
        },
      ]
    })

    // Add payment record
    setPayments((prev) => [
      {
        id: `pay${Date.now()}`,
        customerName: sale.customerName,
        amount: sale.total,
        paymentMode: sale.paymentMode,
        status: sale.paymentMode === "Pending" ? "Pending" : "Paid",
      },
      ...prev,
    ])
  }, [])

  const addProduct = useCallback((product: Omit<Product, "id">) => {
    setProducts((prev) => [
      ...prev,
      { ...product, id: `p${Date.now()}` },
    ])
  }, [])

  const updateProductStock = useCallback((id: string, stock: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock } : p))
    )
  }, [])

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        currentPage,
        sales,
        products,
        customers,
        payments,
        login,
        logout,
        setCurrentPage,
        addSale,
        addProduct,
        updateProductStock,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppState() {
  const context = useContext(AppContext)
  if (!context) throw new Error("useAppState must be used within AppProvider")
  return context
}
