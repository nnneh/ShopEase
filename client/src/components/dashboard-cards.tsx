'use client'
import { ArrowDown, ArrowUp, CreditCard, DollarSign, Package, Users } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function DashboardCards() {
  return (
    <div // This is the main wrapper div for DashboardCards
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" // This div is what we need to investigate
    >
      {/* Card 1: Total Revenue */}
      <Card className="shop-card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium" style={{ color: '#007bff' }}>Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4" style={{ color: '#4A5568' }} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold" style={{ color: '#4A5568' }}>$45,231.89</div>
          <div className="flex items-center space-x-2 text-xs" style={{ color: '#4A5568' }}>
            <span className={cn("flex items-center", "text-emerald-500")}>
              <ArrowUp className="mr-1 h-3 w-3" />
              12.5%
            </span>
            <span>from last month</span>
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Sales */}
      <Card className="shop-card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium" style={{ color: '#007bff' }}>Sales</CardTitle>
          <CreditCard className="h-4 w-4" style={{ color: '#4A5568' }} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold" style={{ color: '#4A5568' }}>+2,350</div>
          <div className="flex items-center space-x-2 text-xs" style={{ color: '#4A5568' }}>
            <span className={cn("flex items-center", "text-emerald-500")}>
              <ArrowUp className="mr-1 h-3 w-3" />
              5.2%
            </span>
            <span>from last month</span>
          </div>
        </CardContent>
      </Card>

      {/* Card 3: Products */}
      <Card className="shop-card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium" style={{ color: '#007bff' }}>Products</CardTitle>
          <Package className="h-4 w-4" style={{ color: '#4A5568' }} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold" style={{ color: '#4A5568' }}>1,245</div>
          <div className="flex items-center space-x-2 text-xs" style={{ color: '#4A5568' }}>
            <span className={cn("flex items-center", "text-emerald-500")}>
              <ArrowUp className="mr-1 h-3 w-3" />
              8.1%
            </span>
            <span>from last month</span>
          </div>
        </CardContent>
      </Card>

      {/* Card 4: Active Customers */}
      <Card className="shop-card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium" style={{ color: '#007bff' }}>Active Customers</CardTitle>
          <Users className="h-4 w-4" style={{ color: '#4A5568' }} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold" style={{ color: '#4A5568' }}>+573</div>
          <div className="flex items-center space-x-2 text-xs" style={{ color: '#4A5568' }}>
            <span className={cn("flex items-center", "text-rose-500")}>
              <ArrowDown className="mr-1 h-3 w-3" />
              2.1%
            </span>
            <span>from last month</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}