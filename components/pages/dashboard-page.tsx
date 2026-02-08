"use client"

import { useAppState } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, AlertTriangle, Clock } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

export function DashboardPage() {
  const { sales, products, payments } = useAppState()

  const today = new Date().toISOString().split("T")[0]
  const todaySales = sales.filter((s) => s.date === today)
  const todayTotal = todaySales.reduce((sum, s) => sum + s.total, 0)
  const todayProfit = Math.round(todayTotal * 0.25)
  const lowStockItems = products.filter((p) => p.stock < 10).length
  const pendingPayments = payments.filter((p) => p.status === "Pending").length

  // Generate daily sales data for bar chart
  const dailySalesData = (() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    return days.map((day, i) => ({
      day,
      sales: Math.round(800 + Math.random() * 1200 + (todayTotal > 0 && i === new Date().getDay() - 1 ? todayTotal : 0)),
    }))
  })()

  const kpiCards = [
    {
      title: "Today Sales",
      value: `Rs ${todayTotal.toLocaleString("en-IN")}`,
      icon: DollarSign,
      color: "bg-[hsl(var(--primary))]",
      textColor: "text-[hsl(var(--primary-foreground))]",
    },
    {
      title: "Today Profit",
      value: `Rs ${todayProfit.toLocaleString("en-IN")}`,
      icon: TrendingUp,
      color: "bg-[hsl(var(--chart-3))]",
      textColor: "text-[hsl(0,0%,100%)]",
    },
    {
      title: "Low Stock Items",
      value: lowStockItems.toString(),
      icon: AlertTriangle,
      color: "bg-[hsl(var(--accent))]",
      textColor: "text-[hsl(var(--accent-foreground))]",
    },
    {
      title: "Pending Payments",
      value: pendingPayments.toString(),
      icon: Clock,
      color: "bg-[hsl(var(--destructive))]",
      textColor: "text-[hsl(var(--destructive-foreground))]",
    },
  ]

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((card) => (
          <Card key={card.title} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-center gap-4 p-5">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${card.color}`}
                >
                  <card.icon className={`h-5 w-5 ${card.textColor}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{card.title}</p>
                  <p className="text-2xl font-bold text-foreground">{card.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold text-foreground">Daily Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailySalesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="day"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                />
                <YAxis
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--foreground))",
                  }}
                  formatter={(value: number) => [`Rs ${value.toLocaleString("en-IN")}`, "Sales"]}
                />
                <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Sales */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold text-foreground">Recent Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sales.slice(0, 5).map((sale) => (
              <div
                key={sale.id}
                className="flex items-center justify-between rounded-lg border border-border p-3"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{sale.customerName}</p>
                  <p className="text-xs text-muted-foreground">{sale.productName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">
                    Rs {sale.total.toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-muted-foreground">{sale.paymentMode}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
