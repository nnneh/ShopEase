'use client'
import React, { useState } from 'react';
import { MoreHorizontal, Search, Filter, Plus, Eye, Edit, MessageCircle, Package, DollarSign, Clock, CheckCircle } from 'lucide-react';

// Define your ShopEase theme colors
const themeColors = {
  primary: '#007bff', // Blue from logo
  secondary: '#28a745', // Green from logo
  tertiary: '#fd7e14', // Orange from logo
  neutral: '#4A5568', // Dark gray for text
  backgroundStart: '#E0F2F7', // Light blue background
  backgroundMiddle: '#E8F6F8',
  backgroundEnd: '#F0F8F9',
};

// ShopEase themed components
const Button = ({ children, variant = "default", size = "default", className = "", ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    default: "text-white shadow-lg hover:shadow-xl hover:scale-105",
    ghost: "hover:bg-white/80 backdrop-blur-sm text-gray-600 hover:text-gray-800",
    outline: "border-2 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 hover:shadow-md border-gray-200"
  };
  
  const sizes = {
    default: "h-12 py-3 px-6",
    icon: "h-10 w-10",
    sm: "h-9 px-4"
  };
  
  const defaultStyle = variant === "default" ? {
    background: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.secondary})`
  } : {};
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      style={defaultStyle}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border-0 bg-white/80 backdrop-blur-sm shadow-xl ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`flex flex-col space-y-2 p-6 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-2xl font-bold ${className}`} style={{ color: themeColors.primary }}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = "" }) => (
  <p className={`text-sm font-medium ${className}`} style={{ color: themeColors.neutral }}>
    {children}
  </p>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

const Table = ({ children, className = "" }) => (
  <div className="w-full overflow-auto">
    <table className={`w-full caption-bottom text-sm ${className}`}>
      {children}
    </table>
  </div>
);

const TableHeader = ({ children }) => (
  <thead className="[&_tr]:border-b border-gray-200">
    {children}
  </thead>
);

const TableBody = ({ children }) => (
  <tbody className="[&_tr:last-child]:border-0">
    {children}
  </tbody>
);

const TableRow = ({ children, className = "" }) => (
  <tr className={`border-b transition-all hover:bg-white/60 border-gray-200 ${className}`}>
    {children}
  </tr>
);

const TableHead = ({ children, className = "" }) => (
  <th className={`h-12 px-4 text-left align-middle font-semibold ${className}`} style={{ color: themeColors.neutral }}>
    {children}
  </th>
);

const TableCell = ({ children, className = "" }) => (
  <td className={`p-4 align-middle ${className}`}>
    {children}
  </td>
);

const DropdownMenu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative inline-block text-left">
      {React.Children.map(children, child =>
        React.cloneElement(child, { isOpen, setIsOpen })
      )}
    </div>
  );
};

const DropdownMenuTrigger = ({ children, isOpen, setIsOpen }) => (
  <div onClick={() => setIsOpen(!isOpen)}>
    {children}
  </div>
);

const DropdownMenuContent = ({ children, align = "start", isOpen, setIsOpen }) => {
  if (!isOpen) return null;
  
  const alignClasses = align === "end" ? "right-0" : "left-0";
  
  return (
    <div className={`absolute ${alignClasses} z-50 mt-2 w-56 rounded-xl border-0 bg-white/95 backdrop-blur-sm p-2 shadow-xl`}>
      <div onClick={() => setIsOpen(false)}>
        {children}
      </div>
    </div>
  );
};

const DropdownMenuLabel = ({ children }) => (
  <div className="px-3 py-2 text-sm font-semibold" style={{ color: themeColors.primary }}>
    {children}
  </div>
);

const DropdownMenuSeparator = () => (
  <div className="-mx-1 my-1 h-px bg-gray-200" />
);

const DropdownMenuItem = ({ children, onClick }) => (
  <div 
    className="relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2 text-sm outline-none transition-all hover:bg-gray-100 hover:scale-105"
    onClick={onClick}
    style={{ color: themeColors.neutral }}
  >
    {children}
  </div>
);

const Input = ({ className = "", ...props }) => (
  <input
    className={`flex h-12 w-full rounded-lg border-2 border-gray-200 bg-white/80 backdrop-blur-sm px-4 py-3 text-sm font-medium placeholder:font-normal transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    style={{ 
      color: themeColors.neutral,
      '--tw-ring-color': themeColors.primary,
      '--tw-placeholder-color': '#94A3B8'
    }}
    {...props}
  />
);

const orders = [
  {
    id: "3210",
    customer: "Olivia Martin",
    product: "Wireless Earbuds",
    date: "Feb 20, 2024",
    status: "Delivered",
    amount: "89.99",
  },
  {
    id: "3209",
    customer: "Ava Johnson",
    product: "Smart Watch",
    date: "Feb 19, 2024",
    status: "Processing",
    amount: "199.99",
  },
  {
    id: "3208",
    customer: "Michael Johnson",
    product: "Running Shoes",
    date: "Feb 18, 2024",
    status: "Pending",
    amount: "129.99",
  },
  {
    id: "3207",
    customer: "Lisa Anderson",
    product: "Backpack",
    date: "Feb 17, 2024",
    status: "Delivered",
    amount: "59.99",
  },
  {
    id: "3206",
    customer: "Samantha Green",
    product: "Smartphone Case",
    date: "Feb 16, 2024",
    status: "Processing",
    amount: "24.99",
  },
  {
    id: "3205",
    customer: "David Wilson",
    product: "Laptop Stand",
    date: "Feb 15, 2024",
    status: "Shipped",
    amount: "79.99",
  },
  {
    id: "3204",
    customer: "Emma Davis",
    product: "Water Bottle",
    date: "Feb 14, 2024",
    status: "Delivered",
    amount: "19.99",
  },
  {
    id: "3203",
    customer: "James Brown",
    product: "Gaming Mouse",
    date: "Feb 13, 2024",
    status: "Processing",
    amount: "45.99",
  }
];

export default function OrderManagementSystem() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.includes(searchTerm);
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleUpdateStatus = (orderId) => {
    alert(`Update status for order #${orderId}`);
  };

  const handleContactCustomer = (customer) => {
    alert(`Contact ${customer}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return `bg-green-100 text-green-800 border border-green-200`;
      case "Processing":
        return `bg-blue-100 text-blue-800 border border-blue-200`;
      case "Shipped":
        return `bg-purple-100 text-purple-800 border border-purple-200`;
      case "Pending":
        return `bg-orange-100 text-orange-800 border border-orange-200`;
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.amount), 0);
  const statusCounts = orders.reduce((counts, order) => {
    counts[order.status] = (counts[order.status] || 0) + 1;
    return counts;
  }, {});

  return (
    <div 
      className="min-h-screen p-6"
      style={{
        background: `linear-gradient(to bottom right, ${themeColors.backgroundStart}, ${themeColors.backgroundMiddle}, ${themeColors.backgroundEnd})`
      }}
    >
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 
              className="text-4xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.secondary})`
              }}
            >
              ShopEase Orders
            </h1>
            <p className="text-lg font-medium" style={{ color: themeColors.neutral }}>
              Manage and track all your orders efficiently
            </p>
          </div>
          <Button className="flex items-center gap-2 text-lg">
            <Plus className="h-5 w-5" />
            New Order
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="hover:scale-105 transition-transform duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold" style={{ color: themeColors.neutral }}>Total Orders</p>
                  <p className="text-3xl font-bold" style={{ color: themeColors.primary }}>{totalOrders}</p>
                </div>
                <div className="p-3 rounded-full" style={{ backgroundColor: `${themeColors.primary}20` }}>
                  <Package className="h-6 w-6" style={{ color: themeColors.primary }} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:scale-105 transition-transform duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold" style={{ color: themeColors.neutral }}>Total Revenue</p>
                  <p className="text-3xl font-bold" style={{ color: themeColors.secondary }}>${totalRevenue.toFixed(2)}</p>
                </div>
                <div className="p-3 rounded-full" style={{ backgroundColor: `${themeColors.secondary}20` }}>
                  <DollarSign className="h-6 w-6" style={{ color: themeColors.secondary }} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:scale-105 transition-transform duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold" style={{ color: themeColors.neutral }}>Processing</p>
                  <p className="text-3xl font-bold" style={{ color: themeColors.tertiary }}>{statusCounts.Processing || 0}</p>
                </div>
                <div className="p-3 rounded-full" style={{ backgroundColor: `${themeColors.tertiary}20` }}>
                  <Clock className="h-6 w-6" style={{ color: themeColors.tertiary }} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:scale-105 transition-transform duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold" style={{ color: themeColors.neutral }}>Delivered</p>
                  <p className="text-3xl font-bold" style={{ color: themeColors.secondary }}>{statusCounts.Delivered || 0}</p>
                </div>
                <div className="p-3 rounded-full" style={{ backgroundColor: `${themeColors.secondary}20` }}>
                  <CheckCircle className="h-6 w-6" style={{ color: themeColors.secondary }} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: themeColors.neutral }} />
            <Input
              placeholder="Search orders, customers, products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="flex h-12 rounded-lg border-2 border-gray-200 bg-white/80 backdrop-blur-sm px-4 py-3 text-sm font-medium transition-all focus:outline-none focus:ring-2"
            style={{ 
              color: themeColors.neutral,
              '--tw-ring-color': themeColors.primary 
            }}
          >
            <option value="All">All Status</option>
            <option value="Delivered">Delivered</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              Showing {filteredOrders.length} of {totalOrders} orders this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-bold" style={{ color: themeColors.primary }}>#{order.id}</TableCell>
                    <TableCell className="font-semibold" style={{ color: themeColors.neutral }}>{order.customer}</TableCell>
                    <TableCell style={{ color: themeColors.neutral }}>{order.product}</TableCell>
                    <TableCell style={{ color: themeColors.neutral }}>{order.date}</TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </div>
                    </TableCell>
                    <TableCell className="font-bold" style={{ color: themeColors.secondary }}>${order.amount}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-5 w-5" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleViewDetails(order)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(order.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Update status
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleContactCustomer(order.customer)}>
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Contact customer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md animate-fade-in">
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
                <CardDescription>Order #{selectedOrder.id}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold" style={{ color: themeColors.neutral }}>Customer</label>
                  <p className="text-base font-medium" style={{ color: themeColors.primary }}>{selectedOrder.customer}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold" style={{ color: themeColors.neutral }}>Product</label>
                  <p className="text-base">{selectedOrder.product}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold" style={{ color: themeColors.neutral }}>Date</label>
                  <p className="text-base">{selectedOrder.date}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold" style={{ color: themeColors.neutral }}>Status</label>
                  <div className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold" style={{ color: themeColors.neutral }}>Amount</label>
                  <p className="text-xl font-bold" style={{ color: themeColors.secondary }}>${selectedOrder.amount}</p>
                </div>
                <div className="flex justify-end pt-6">
                  <Button variant="outline" onClick={() => setSelectedOrder(null)}>
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}