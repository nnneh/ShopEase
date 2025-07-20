'use client'

import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function RecentOrders() {
  return (
    <Card className="shop-card-shadow-lg border-0 bg-card/80 backdrop-blur-sm"> {/* Applied consistent card styling */}
      <CardHeader>
        <CardTitle style={{ color: '#007bff' }}>Recent Orders</CardTitle> {/* Primary color for title */}
        <CardDescription style={{ color: '#4A5568' }}>You have 312 orders this month</CardDescription> {/* Neutral color for description */}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead style={{ color: '#4A5568' }}>Order ID</TableHead>
              <TableHead style={{ color: '#4A5568' }}>Customer</TableHead>
              <TableHead style={{ color: '#4A5568' }}>Product</TableHead>
              <TableHead style={{ color: '#4A5568' }}>Date</TableHead>
              <TableHead style={{ color: '#4A5568' }}>Status</TableHead>
              <TableHead style={{ color: '#4A5568' }}>Amount</TableHead>
              <TableHead className="text-right" style={{ color: '#4A5568' }}>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium" style={{ color: '#4A5568' }}>#{order.id}</TableCell>
                <TableCell style={{ color: '#4A5568' }}>{order.customer}</TableCell>
                <TableCell style={{ color: '#4A5568' }}>{order.product}</TableCell>
                <TableCell style={{ color: '#4A5568' }}>{order.date}</TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      order.status === "Delivered"
                        ? "bg-emerald-100 text-emerald-800"
                        : order.status === "Processing"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "Cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {order.status}
                  </div>
                </TableCell>
                <TableCell style={{ color: '#4A5568' }}>${order.amount}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" style={{ color: '#4A5568' }}>
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel style={{ color: '#4A5568' }}>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Update status</DropdownMenuItem>
                      <DropdownMenuItem>Contact customer</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

const orders = [
  {
    id: "3215",
    customer: "Priya Gurung", 
    product: "Smart Sleep Ring",
    date: "Jul 12, 2025",
    status: "Delivered",
    amount: "249.99",
  },
  {
    id: "3214",
    customer: "Sagar Thapa", 
    product: "Aromatherapy Diffuser",
    date: "Jul 11, 2025",
    status: "Processing",
    amount: "49.99",
  },
  {
    id: "3213",
    customer: "Anjali Lama", 
    product: "Sustainable Yoga Mat",
    date: "Jul 10, 2025",
    status: "Delivered",
    amount: "79.99",
  },
  {
    id: "3212",
    customer: "Rajan Karki", 
    product: "Ergonomic Office Chair",
    date: "Jul 09, 2025",
    status: "Pending",
    amount: "349.99",
  },
  {
    id: "3211",
    customer: "Shreya Basnet", 
    product: "Plant-Based Protein Powder",
    date: "Jul 08, 2025",
    status: "Cancelled",
    amount: "39.99",
  },
]