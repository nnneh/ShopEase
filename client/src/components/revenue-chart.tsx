"use client"
import { useEffect, useState } from "react"
import { BarChart, LineChart, PieChart, TrendingUp, Users, ShoppingCart, Star, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  LineChart as RechartsLineChart, 
  Line, 
  PieChart as RechartsPieChart,
  Cell,
  Pie,
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  ComposedChart
} from "recharts"

// ShopEase theme colors
const themeColors = {
  primary: '#007bff',
  secondary: '#28a745', 
  tertiary: '#fd7e14',
  quaternary: '#6f42c1',
  neutral: '#4A5568',
  lightNeutral: '#718096',
  background: '#E0F2F7',
  cardBackground: '#FFFFFF',
  borderColor: '#E2E8F0',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444'
};

// Sample data
const revenueData = [
  { month: "Jan", revenue: 45000, target: 50000, orders: 320 },
  { month: "Feb", revenue: 52000, target: 55000, orders: 380 },
  { month: "Mar", revenue: 48000, target: 52000, orders: 350 },
  { month: "Apr", revenue: 61000, target: 58000, orders: 420 },
  { month: "May", revenue: 55000, target: 60000, orders: 390 },
  { month: "Jun", revenue: 67000, target: 65000, orders: 480 },
  { month: "Jul", revenue: 72000, target: 70000, orders: 520 },
  { month: "Aug", revenue: 69000, target: 72000, orders: 490 },
  { month: "Sep", revenue: 75000, target: 75000, orders: 540 },
  { month: "Oct", revenue: 78000, target: 78000, orders: 560 },
  { month: "Nov", revenue: 82000, target: 80000, orders: 590 },
  { month: "Dec", revenue: 85000, target: 85000, orders: 610 }
]

const customerData = [
  { month: "Jan", total: 1200, new: 120 },
  { month: "Feb", total: 1450, new: 250 },
  { month: "Mar", total: 1680, new: 230 },
  { month: "Apr", total: 2100, new: 420 },
  { month: "May", total: 2350, new: 250 },
  { month: "Jun", total: 2800, new: 450 }
]

const categoryData = [
  { name: "Electronics", value: 35, color: themeColors.primary },
  { name: "Fashion", value: 28, color: themeColors.secondary },
  { name: "Home & Garden", value: 18, color: themeColors.tertiary },
  { name: "Sports", value: 12, color: themeColors.quaternary },
  { name: "Others", value: 7, color: themeColors.lightNeutral }
]

const topProducts = [
  { name: "Smart Sleep Ring", category: "Wearable Tech", price: 249.99, sales: 890, trend: "up" },
  { name: "Aromatherapy Diffuser", category: "Home Wellness", price: 49.99, sales: 720, trend: "up" },
  { name: "Sustainable Yoga Mat", category: "Fitness & Lifestyle", price: 79.99, sales: 650, trend: "down" },
  { name: "Ergonomic Office Chair", category: "Home Office", price: 349.99, sales: 580, trend: "up" },
  { name: "Plant-Based Protein Powder", category: "Health Supplements", price: 39.99, sales: 520, trend: "up" }
]

const kpiData = [
  { title: "Total Revenue", value: "$847,500", change: "+12.5%", trend: "up", icon: TrendingUp },
  { title: "Total Orders", value: "5,470", change: "+8.2%", trend: "up", icon: ShoppingCart },
  { title: "Total Customers", value: "2,850", change: "+15.3%", trend: "up", icon: Users },
  { title: "Avg Order Value", value: "$154.89", change: "-2.1%", trend: "down", icon: BarChart }
]

export function RevenueChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div 
        className="min-h-screen p-6"
        style={{
          background: `linear-gradient(135deg, ${themeColors.background} 0%, #E8F6F8 50%, #F0F8F9 100%)`
        }}
      >
        <div className="animate-pulse">
          <div className="h-8 bg-white/50 rounded w-64 mb-4"></div>
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-white/50 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value)
  }

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value)
  }

  return (
    <div 
      className="min-h-screen p-4 md:p-6"
      style={{
        background: `linear-gradient(135deg, ${themeColors.background} 0%, #E8F6F8 50%, #F0F8F9 100%)`
      }}
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.secondary})`
              }}>
            ShopEase Analytics Dashboard
          </h1>
          <div className="text-sm text-right" style={{ color: themeColors.lightNeutral }}>
            <p>Last updated: Just now</p>
            <p>Data as of December 2024</p>
          </div>
        </div>
        <p style={{ color: themeColors.neutral }} className="text-lg">
          Comprehensive insights into your e-commerce performance
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon
          const isPositive = kpi.trend === "up"
          return (
            <Card key={index} className="shadow-lg border-0 bg-white/95 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Icon className="h-5 w-5" style={{ color: themeColors.primary }} />
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {kpi.change}
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold" style={{ color: themeColors.neutral }}>{kpi.value}</p>
                  <p className="text-sm" style={{ color: themeColors.lightNeutral }}>{kpi.title}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Revenue Analytics - Takes 2 columns on large screens */}
        <Card className="lg:col-span-2 shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle style={{ color: themeColors.primary }} className="flex items-center gap-2 text-xl">
                  <TrendingUp className="h-5 w-5" style={{ color: themeColors.secondary }} />
                  Revenue & Orders Analytics
                </CardTitle>
                <CardDescription style={{ color: themeColors.lightNeutral }} className="mt-1">
                  Monthly revenue vs target with order volume trends
                </CardDescription>
              </div>
              <Tabs defaultValue="combined" className="w-auto">
                <TabsList className="bg-gray-100">
                  <TabsTrigger value="combined" className="text-xs px-3">Combined</TabsTrigger>
                  <TabsTrigger value="revenue" className="text-xs px-3">Revenue</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="combined">
              <TabsContent value="combined" className="mt-0">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={themeColors.borderColor} />
                      <XAxis 
                        dataKey="month" 
                        tick={{ fill: themeColors.neutral, fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis 
                        yAxisId="revenue"
                        tick={{ fill: themeColors.neutral, fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={formatCurrency}
                      />
                      <YAxis 
                        yAxisId="orders"
                        orientation="right"
                        tick={{ fill: themeColors.neutral, fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'white',
                          border: `1px solid ${themeColors.borderColor}`,
                          borderRadius: '12px',
                          boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                        }}
                        formatter={(value, name) => {
                          if (name === 'orders') return [formatNumber(value), 'Orders']
                          return [formatCurrency(value), name === 'revenue' ? 'Revenue' : 'Target']
                        }}
                      />
                      <Bar yAxisId="revenue" dataKey="target" fill={themeColors.lightNeutral} radius={[4, 4, 0, 0]} opacity={0.4} />
                      <Bar yAxisId="revenue" dataKey="revenue" fill={themeColors.primary} radius={[4, 4, 0, 0]} />
                      <Line yAxisId="orders" type="monotone" dataKey="orders" stroke={themeColors.tertiary} strokeWidth={3} dot={{ r: 4 }} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="revenue" className="mt-0">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={themeColors.primary} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={themeColors.primary} stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={themeColors.borderColor} />
                      <XAxis dataKey="month" tick={{ fill: themeColors.neutral, fontSize: 12 }} tickLine={false} axisLine={false} />
                      <YAxis tick={{ fill: themeColors.neutral, fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={formatCurrency} />
                      <Tooltip contentStyle={{ backgroundColor: 'white', border: `1px solid ${themeColors.borderColor}`, borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }} />
                      <Area type="monotone" dataKey="revenue" stroke={themeColors.primary} strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Product Categories */}
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle style={{ color: themeColors.primary }} className="flex items-center gap-2">
              <PieChart className="h-5 w-5" style={{ color: themeColors.tertiary }} />
              Product Categories
            </CardTitle>
            <CardDescription style={{ color: themeColors.lightNeutral }}>
              Sales distribution by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: `1px solid ${themeColors.borderColor}`,
                      borderRadius: '12px',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                    }}
                    formatter={(value) => [`${value}%`, 'Share']}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                    formatter={(value) => <span style={{ color: themeColors.neutral, fontSize: '12px' }}>{value}</span>}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Customer Growth */}
        <Card className="lg:col-span-3 shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle style={{ color: themeColors.primary }} className="flex items-center gap-2">
              <Users className="h-5 w-5" style={{ color: themeColors.secondary }} />
              Customer Growth
            </CardTitle>
            <CardDescription style={{ color: themeColors.lightNeutral }}>
              Customer acquisition and retention trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={customerData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={themeColors.primary} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={themeColors.primary} stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={themeColors.secondary} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={themeColors.secondary} stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={themeColors.borderColor} />
                  <XAxis dataKey="month" tick={{ fill: themeColors.neutral, fontSize: 12 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fill: themeColors.neutral, fontSize: 12 }} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'white', border: `1px solid ${themeColors.borderColor}`, borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }} />
                  <Area type="monotone" dataKey="total" stackId="1" stroke={themeColors.primary} fill="url(#colorTotal)" />
                  <Area type="monotone" dataKey="new" stackId="2" stroke={themeColors.secondary} fill="url(#colorNew)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="lg:col-span-2 shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle style={{ color: themeColors.primary }} className="flex items-center gap-2">
                  <Star className="h-5 w-5" style={{ color: themeColors.warning }} />
                  Top Products
                </CardTitle>
                <CardDescription style={{ color: themeColors.lightNeutral }}>
                  Best-selling products this month
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-0">
            <div className="space-y-4 max-h-[300px] overflow-y-auto px-6">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold text-sm"
                         style={{ backgroundColor: themeColors.primary }}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm" style={{ color: themeColors.neutral }}>{product.name}</p>
                      <p className="text-xs" style={{ color: themeColors.lightNeutral }}>{product.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold" style={{ color: themeColors.neutral }}>${product.price}</p>
                    <div className="flex items-center gap-1">
                      <span className="text-xs" style={{ color: themeColors.lightNeutral }}>{product.sales} sold</span>
                      {product.trend === 'up' ? 
                        <ArrowUpRight className="h-3 w-3 text-green-500" /> : 
                        <ArrowDownRight className="h-3 w-3 text-red-500" />
                      }
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 pt-4">
              <Button 
                className="w-full text-white font-medium"
                style={{
                  background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.secondary})`
                }}
              >
                View all products →
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}