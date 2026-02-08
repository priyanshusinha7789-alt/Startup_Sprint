"use client"

import React from "react"

import { useState } from "react"
import { useAppState } from "@/lib/store"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardPage } from "@/components/pages/dashboard-page"
import { BillingPage } from "@/components/pages/billing-page"
import { InventoryPage } from "@/components/pages/inventory-page"
import { CustomersPage } from "@/components/pages/customers-page"
import { PaymentsPage } from "@/components/pages/payments-page"
import { ReportsPage } from "@/components/pages/reports-page"
import { Menu } from "lucide-react"

const pages: Record<string, React.ComponentType> = {
  dashboard: DashboardPage,
  billing: BillingPage,
  inventory: InventoryPage,
  customers: CustomersPage,
  payments: PaymentsPage,
  reports: ReportsPage,
}

const pageTitles: Record<string, string> = {
  dashboard: "Dashboard",
  billing: "Billing",
  inventory: "Inventory",
  customers: "Customers",
  payments: "Payments",
  reports: "Reports",
}

export function DashboardLayout() {
  const { currentPage } = useAppState()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const PageComponent = pages[currentPage] || DashboardPage
  const pageTitle = pageTitles[currentPage] || "Dashboard"

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center gap-4 border-b border-border bg-card px-4 md:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-muted-foreground hover:text-foreground md:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">{pageTitle}</h1>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <PageComponent />
        </main>
      </div>
    </div>
  )
}
