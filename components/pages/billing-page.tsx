"use client"

import React from "react"

import { useState } from "react"
import { useAppState, type SaleRecord } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Receipt, Check } from "lucide-react"

export function BillingPage() {
  const { sales, addSale } = useAppState()
  const [customerName, setCustomerName] = useState("")
  const [productName, setProductName] = useState("")
  const [quantity, setQuantity] = useState("")
  const [pricePerUnit, setPricePerUnit] = useState("")
  const [paymentMode, setPaymentMode] = useState<"Cash" | "UPI" | "Pending">("Cash")
  const [generatedBill, setGeneratedBill] = useState<Omit<SaleRecord, "id" | "date"> | null>(null)

  const handleGenerateBill = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customerName || !productName || !quantity || !pricePerUnit) return

    const qty = Number(quantity)
    const price = Number(pricePerUnit)
    const total = qty * price

    const bill = {
      customerName,
      productName,
      quantity: qty,
      pricePerUnit: price,
      total,
      paymentMode,
    }

    setGeneratedBill(bill)
    addSale(bill)

    // Reset form
    setCustomerName("")
    setProductName("")
    setQuantity("")
    setPricePerUnit("")
    setPaymentMode("Cash")
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Billing Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
              <Receipt className="h-4 w-4 text-[hsl(var(--primary))]" />
              Create New Bill
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerateBill} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customerName" className="text-foreground">Customer Name</Label>
                <Input
                  id="customerName"
                  placeholder="Enter customer name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="productName" className="text-foreground">Product Name</Label>
                <Input
                  id="productName"
                  placeholder="Enter product name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity" className="text-foreground">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    placeholder="Qty"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pricePerUnit" className="text-foreground">Price per Unit (Rs)</Label>
                  <Input
                    id="pricePerUnit"
                    type="number"
                    min="0"
                    placeholder="Price"
                    value={pricePerUnit}
                    onChange={(e) => setPricePerUnit(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Payment Mode</Label>
                <Select
                  value={paymentMode}
                  onValueChange={(v) => setPaymentMode(v as "Cash" | "UPI" | "Pending")}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="UPI">UPI</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {quantity && pricePerUnit && (
                <div className="rounded-lg border border-border bg-muted p-3">
                  <p className="text-sm text-muted-foreground">Estimated Total</p>
                  <p className="text-xl font-bold text-foreground">
                    Rs {(Number(quantity) * Number(pricePerUnit)).toLocaleString("en-IN")}
                  </p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(168,76%,30%)]"
                size="lg"
              >
                Generate Bill
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Generated Bill */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold text-foreground">Generated Bill</CardTitle>
          </CardHeader>
          <CardContent>
            {generatedBill ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 rounded-lg bg-[hsl(152,69%,40%)] p-3">
                  <Check className="h-4 w-4 text-[hsl(0,0%,100%)]" />
                  <p className="text-sm font-medium text-[hsl(0,0%,100%)]">
                    Bill generated and recorded successfully
                  </p>
                </div>

                <div className="rounded-lg border border-border p-4">
                  <div className="mb-4 border-b border-border pb-3">
                    <h3 className="text-lg font-bold text-foreground">Invoice</h3>
                    <p className="text-xs text-muted-foreground">
                      {new Date().toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Customer</span>
                      <span className="font-medium text-foreground">{generatedBill.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Product</span>
                      <span className="font-medium text-foreground">{generatedBill.productName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Quantity</span>
                      <span className="font-medium text-foreground">{generatedBill.quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price / Unit</span>
                      <span className="font-medium text-foreground">
                        Rs {generatedBill.pricePerUnit.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Payment</span>
                      <Badge
                        variant={generatedBill.paymentMode === "Pending" ? "destructive" : "default"}
                        className={
                          generatedBill.paymentMode !== "Pending"
                            ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
                            : ""
                        }
                      >
                        {generatedBill.paymentMode}
                      </Badge>
                    </div>
                    <div className="border-t border-border pt-3">
                      <div className="flex justify-between">
                        <span className="text-base font-bold text-foreground">Total</span>
                        <span className="text-base font-bold text-foreground">
                          Rs {generatedBill.total.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-border">
                <p className="text-sm text-muted-foreground">
                  Fill the form and click Generate Bill to see the invoice here
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Sales Records Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold text-foreground">Sales Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="font-medium text-foreground">{sale.customerName}</TableCell>
                  <TableCell className="text-foreground">{sale.productName}</TableCell>
                  <TableCell className="text-right text-foreground">{sale.quantity}</TableCell>
                  <TableCell className="text-right text-foreground">
                    Rs {sale.pricePerUnit.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell className="text-right font-medium text-foreground">
                    Rs {sale.total.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={sale.paymentMode === "Pending" ? "destructive" : "secondary"}
                      className={
                        sale.paymentMode === "Cash"
                          ? "bg-[hsl(152,69%,92%)] text-[hsl(152,69%,30%)]"
                          : sale.paymentMode === "UPI"
                            ? "bg-[hsl(220,70%,92%)] text-[hsl(220,70%,35%)]"
                            : ""
                      }
                    >
                      {sale.paymentMode}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{sale.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
