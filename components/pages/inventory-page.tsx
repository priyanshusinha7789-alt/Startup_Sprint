"use client"

import React from "react"

import { useState } from "react"
import { useAppState } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Package, Plus, Save } from "lucide-react"

export function InventoryPage() {
  const { products, addProduct, updateProductStock } = useAppState()
  const [newName, setNewName] = useState("")
  const [newStock, setNewStock] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editStock, setEditStock] = useState("")

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName || !newStock) return
    addProduct({ name: newName, stock: Number(newStock) })
    setNewName("")
    setNewStock("")
  }

  const handleSaveStock = (id: string) => {
    updateProductStock(id, Number(editStock))
    setEditingId(null)
    setEditStock("")
  }

  return (
    <div className="space-y-6">
      {/* Add Product Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
            <Plus className="h-4 w-4 text-[hsl(var(--primary))]" />
            Add New Product
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddProduct} className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1 space-y-2">
              <Label htmlFor="newProductName" className="text-foreground">Product Name</Label>
              <Input
                id="newProductName"
                placeholder="Enter product name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
              />
            </div>
            <div className="w-full space-y-2 sm:w-36">
              <Label htmlFor="newProductStock" className="text-foreground">Initial Stock</Label>
              <Input
                id="newProductStock"
                type="number"
                min="0"
                placeholder="Stock"
                value={newStock}
                onChange={(e) => setNewStock(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(168,76%,30%)]"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
            <Package className="h-4 w-4 text-[hsl(var(--primary))]" />
            Stock Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead className="text-right">Stock Available</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium text-foreground">{product.name}</TableCell>
                  <TableCell className="text-right">
                    {editingId === product.id ? (
                      <Input
                        type="number"
                        min="0"
                        value={editStock}
                        onChange={(e) => setEditStock(e.target.value)}
                        className="ml-auto w-24"
                      />
                    ) : (
                      <span className="text-foreground">{product.stock}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {product.stock < 10 ? (
                      <Badge variant="destructive">Low Stock</Badge>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="bg-[hsl(152,69%,92%)] text-[hsl(152,69%,30%)]"
                      >
                        In Stock
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {editingId === product.id ? (
                      <Button
                        size="sm"
                        onClick={() => handleSaveStock(product.id)}
                        className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(168,76%,30%)]"
                      >
                        <Save className="mr-1 h-3 w-3" />
                        Save
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingId(product.id)
                          setEditStock(product.stock.toString())
                        }}
                      >
                        Update Stock
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
