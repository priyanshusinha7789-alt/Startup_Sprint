"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileBarChart } from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const monthlySalesData = [
  { month: "Aug", sales: 24000, profit: 6000 },
  { month: "Sep", sales: 31000, profit: 7800 },
  { month: "Oct", sales: 28000, profit: 7000 },
  { month: "Nov", sales: 36000, profit: 9000 },
  { month: "Dec", sales: 42000, profit: 10500 },
  { month: "Jan", sales: 38000, profit: 9500 },
  { month: "Feb", sales: 22000, profit: 5500 },
]

const monthlyProfitData = [
  { month: "Aug", profit: 6000 },
  { month: "Sep", profit: 7800 },
  { month: "Oct", profit: 7000 },
  { month: "Nov", profit: 9000 },
  { month: "Dec", profit: 10500 },
  { month: "Jan", profit: 9500 },
  { month: "Feb", profit: 5500 },
]

export function ReportsPage() {
  const totalSales = monthlySalesData.reduce((sum, d) => sum + d.sales, 0)
  const totalProfit = monthlySalesData.reduce((sum, d) => sum + d.profit, 0)
  const avgMonthly = Math.round(totalSales / monthlySalesData.length)

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Total Sales (7 months)</p>
            <p className="text-2xl font-bold text-foreground">
              Rs {totalSales.toLocaleString("en-IN")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Total Profit (7 months)</p>
            <p className="text-2xl font-bold text-[hsl(152,69%,30%)]">
              Rs {totalProfit.toLocaleString("en-IN")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Avg. Monthly Sales</p>
            <p className="text-2xl font-bold text-foreground">
              Rs {avgMonthly.toLocaleString("en-IN")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Sales Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
            <FileBarChart className="h-4 w-4 text-[hsl(var(--primary))]" />
            Monthly Sales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySalesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="month"
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
                  formatter={(value: number) => [`Rs ${value.toLocaleString("en-IN")}`]}
                />
                <Legend />
                <Bar dataKey="sales" name="Sales" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                <Bar dataKey="profit" name="Profit" fill="hsl(var(--chart-2))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Profit Line Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
            <FileBarChart className="h-4 w-4 text-[hsl(var(--chart-2))]" />
            Monthly Profit Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyProfitData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="month"
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
                  formatter={(value: number) => [`Rs ${value.toLocaleString("en-IN")}`, "Profit"]}
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
