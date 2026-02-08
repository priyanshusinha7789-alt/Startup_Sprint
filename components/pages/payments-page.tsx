"use client"

import { useAppState } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CreditCard } from "lucide-react"

export function PaymentsPage() {
  const { payments } = useAppState()

  const totalPaid = payments
    .filter((p) => p.status === "Paid")
    .reduce((sum, p) => sum + p.amount, 0)
  const totalPending = payments
    .filter((p) => p.status === "Pending")
    .reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Total Collected</p>
            <p className="text-2xl font-bold text-[hsl(152,69%,30%)]">
              Rs {totalPaid.toLocaleString("en-IN")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Pending Amount</p>
            <p className="text-2xl font-bold text-[hsl(0,84%,50%)]">
              Rs {totalPending.toLocaleString("en-IN")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Total Transactions</p>
            <p className="text-2xl font-bold text-foreground">{payments.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
            <CreditCard className="h-4 w-4 text-[hsl(var(--primary))]" />
            Payment Records
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer Name</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Payment Mode</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium text-foreground">{payment.customerName}</TableCell>
                  <TableCell className="text-right font-medium text-foreground">
                    Rs {payment.amount.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        payment.paymentMode === "Cash"
                          ? "bg-[hsl(152,69%,92%)] text-[hsl(152,69%,30%)]"
                          : payment.paymentMode === "UPI"
                            ? "bg-[hsl(220,70%,92%)] text-[hsl(220,70%,35%)]"
                            : "bg-[hsl(38,92%,92%)] text-[hsl(38,60%,30%)]"
                      }
                    >
                      {payment.paymentMode}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {payment.status === "Paid" ? (
                      <Badge
                        variant="secondary"
                        className="bg-[hsl(152,69%,92%)] text-[hsl(152,69%,30%)]"
                      >
                        Paid
                      </Badge>
                    ) : (
                      <Badge variant="destructive">Pending</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {payments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    No payment records yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
