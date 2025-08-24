'use client'
import React, { useState, useEffect } from 'react';
import { MoreHorizontal, Search, Plus, Eye, Edit, MessageCircle, Package, DollarSign, Clock, CheckCircle, X, User, ShoppingBag, Calendar, MapPin, Phone, Mail, Trash2 } from 'lucide-react';

// Define your ShopEase theme colors
const themeColors = {
  primary: '#007bff',
  secondary: '#28a745',
  tertiary: '#fd7e14',
  neutral: '#4A5568',
  backgroundStart: '#E0F2F7',
  backgroundMiddle: '#E8F6F8',
  backgroundEnd: '#F0F8F9',
};

// API Configuration - Replace with your actual API endpoints
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL 

// Real API functions - These will connect to your actual database
const orderAPI = {
  // GET /api/orders - Fetch all orders from database
  fetchOrders: async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/orders`, {
      //   method: 'GET',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
      //     'Content-Type': 'application/json',
      //   },
      // });
      // const data = await response.json();
      // return data;

      // MOCK DATA - Remove this when connecting to real database
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        success: true,
        data: [
          {
            _id: "65f1a2b3c4d5e6f7g8h9i0j1",
            orderId: "ORD-2024-001",
            customer: {
              name: "Olivia Martin",
              email: "olivia.martin@example.com",
              phone: "+1-555-0123",
              address: "123 Main St, New York, NY 10001"
            },
            products: [
              {
                name: "Wireless Earbuds",
                quantity: 1,
                price: 89.99,
                sku: "WE-001"
              }
            ],
            totalAmount: 89.99,
            status: "delivered",
            paymentStatus: "paid",
            shippingMethod: "standard",
            trackingNumber: "TRK123456789",
            createdAt: "2024-02-20T10:30:00Z",
            updatedAt: "2024-02-22T14:45:00Z",
            deliveredAt: "2024-02-22T14:45:00Z"
          },
          {
            _id: "65f1a2b3c4d5e6f7g8h9i0j2",
            orderId: "ORD-2024-002",
            customer: {
              name: "Ava Johnson",
              email: "ava.johnson@example.com",
              phone: "+1-555-0124",
              address: "456 Oak Ave, Los Angeles, CA 90210"
            },
            products: [
              {
                name: "Smart Watch",
                quantity: 1,
                price: 199.99,
                sku: "SW-001"
              }
            ],
            totalAmount: 199.99,
            status: "processing",
            paymentStatus: "paid",
            shippingMethod: "express",
            trackingNumber: null,
            createdAt: "2024-02-19T09:15:00Z",
            updatedAt: "2024-02-19T16:30:00Z"
          },
          {
            _id: "65f1a2b3c4d5e6f7g8h9i0j3",
            orderId: "ORD-2024-003",
            customer: {
              name: "Michael Johnson",
              email: "michael.johnson@example.com",
              phone: "+1-555-0125",
              address: "789 Pine St, Chicago, IL 60601"
            },
            products: [
              {
                name: "Running Shoes",
                quantity: 1,
                price: 129.99,
                sku: "RS-001"
              }
            ],
            totalAmount: 129.99,
            status: "pending",
            paymentStatus: "pending",
            shippingMethod: "standard",
            trackingNumber: null,
            createdAt: "2024-02-18T14:20:00Z",
            updatedAt: "2024-02-18T14:20:00Z"
          },
          {
            _id: "65f1a2b3c4d5e6f7g8h9i0j4",
            orderId: "ORD-2024-004",
            customer: {
              name: "Lisa Anderson",
              email: "lisa.anderson@example.com",
              phone: "+1-555-0126",
              address: "321 Elm St, Houston, TX 77001"
            },
            products: [
              {
                name: "Backpack",
                quantity: 2,
                price: 29.99,
                sku: "BP-001"
              }
            ],
            totalAmount: 59.98,
            status: "shipped",
            paymentStatus: "paid",
            shippingMethod: "standard",
            trackingNumber: "TRK987654321",
            createdAt: "2024-02-17T11:45:00Z",
            updatedAt: "2024-02-20T08:30:00Z",
            shippedAt: "2024-02-20T08:30:00Z"
          },
          {
            _id: "65f1a2b3c4d5e6f7g8h9i0j5",
            orderId: "ORD-2024-005",
            customer: {
              name: "Samantha Green",
              email: "samantha.green@example.com",
              phone: "+1-555-0127",
              address: "654 Maple Dr, Phoenix, AZ 85001"
            },
            products: [
              {
                name: "Smartphone Case",
                quantity: 1,
                price: 24.99,
                sku: "SC-001"
              }
            ],
            totalAmount: 24.99,
            status: "processing",
            paymentStatus: "paid",
            shippingMethod: "express",
            trackingNumber: null,
            createdAt: "2024-02-16T13:10:00Z",
            updatedAt: "2024-02-17T10:20:00Z"
          }
        ],
        total: 5,
        page: 1,
        totalPages: 1
      };
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  // POST /api/orders - Create new order in database
  createOrder: async (orderData) => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/orders`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(orderData),
      // });
      // const data = await response.json();
      // return data;

      // MOCK DATA - Remove this when connecting to real database
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newOrder = {
        _id: `65f1a2b3c4d5e6f7g8h9i0j${Date.now()}`,
        orderId: `ORD-2024-${String(Date.now()).slice(-3)}`,
        customer: {
          name: orderData.customerName,
          email: orderData.customerEmail,
          phone: orderData.customerPhone,
          address: orderData.customerAddress
        },
        products: [
          {
            name: orderData.productName,
            quantity: orderData.quantity || 1,
            price: parseFloat(orderData.amount),
            sku: `SKU-${Date.now()}`
          }
        ],
        totalAmount: parseFloat(orderData.amount),
        status: "pending",
        paymentStatus: "pending",
        shippingMethod: orderData.shippingMethod || "standard",
        trackingNumber: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      return {
        success: true,
        data: newOrder,
        message: "Order created successfully!"
      };
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // PUT /api/orders/:id/status - Update order status in database
  updateOrderStatus: async (orderId, newStatus) => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
      //   method: 'PUT',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ status: newStatus }),
      // });
      // const data = await response.json();
      // return data;

      // MOCK DATA - Remove this when connecting to real database
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        success: true,
        message: `Order status updated to ${newStatus} successfully!`
      };
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  },

  // DELETE /api/orders/:id - Delete order from database
  deleteOrder: async (orderId) => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
      //   method: 'DELETE',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
      //     'Content-Type': 'application/json',
      //   },
      // });
      // const data = await response.json();
      // return data;

      // MOCK DATA - Remove this when connecting to real database
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return {
        success: true,
        message: "Order deleted successfully!"
      };
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  },

  // POST /api/orders/:id/contact - Send message to customer
  contactCustomer: async (orderId, message) => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/orders/${orderId}/contact`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ message }),
      // });
      // const data = await response.json();
      // return data;

      // MOCK DATA - Remove this when connecting to real database
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return {
        success: true,
        message: "Message sent to customer successfully!"
      };
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }
};

// Utility functions
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// ShopEase themed components
const Button = ({ children, variant = "default", size = "default", className = "", disabled = false, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    default: "text-white shadow-lg hover:shadow-xl hover:scale-105",
    ghost: "hover:bg-white/80 backdrop-blur-sm text-gray-600 hover:text-gray-800",
    outline: "border-2 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 hover:shadow-md border-gray-200",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-lg hover:shadow-xl"
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
      disabled={disabled}
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

const Label = ({ children, className = "" }) => (
  <label className={`text-sm font-semibold ${className}`} style={{ color: themeColors.neutral }}>
    {children}
  </label>
);

const Select = ({ children, className = "", ...props }) => (
  <select
    className={`flex h-12 rounded-lg border-2 border-gray-200 bg-white/80 backdrop-blur-sm px-4 py-3 text-sm font-medium transition-all focus:outline-none focus:ring-2 ${className}`}
    style={{ 
      color: themeColors.neutral,
      '--tw-ring-color': themeColors.primary 
    }}
    {...props}
  >
    {children}
  </select>
);

// Loading Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: `${themeColors.primary}40`, borderTopColor: themeColors.primary }}></div>
  </div>
);

// Toast notification function
const showToast = (message, type = 'success') => {
  const toast = document.createElement('div');
  toast.className = `fixed top-4 right-4 px-6 py-3 rounded-lg text-white font-semibold z-50 transform transition-all duration-300 ${type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('translate-y-[-100px]', 'opacity-0');
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 300);
  }, 3000);
};

export default function OrderManagementSystem() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(null);
  const [showContactModal, setShowContactModal] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // New order form state
  const [newOrderForm, setNewOrderForm] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerAddress: '',
    productName: '',
    quantity: 1,
    amount: '',
    shippingMethod: 'standard'
  });

  // Contact form state
  const [contactForm, setContactForm] = useState({
    message: ''
  });

  // Load orders on component mount
  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await orderAPI.fetchOrders();
      if (response.success) {
        setOrders(response.data);
      } else {
        showToast('Failed to load orders', 'error');
      }
    } catch (error) {
      console.error('Error loading orders:', error);
      showToast('Failed to load orders', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrder = async () => {
    if (!newOrderForm.customerName || !newOrderForm.productName || !newOrderForm.amount) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    try {
      setActionLoading(true);
      const response = await orderAPI.createOrder(newOrderForm);
      
      if (response.success) {
        setOrders(prev => [response.data, ...prev]);
        setShowNewOrderModal(false);
        setNewOrderForm({
          customerName: '',
          customerEmail: '',
          customerPhone: '',
          customerAddress: '',
          productName: '',
          quantity: 1,
          amount: '',
          shippingMethod: 'standard'
        });
        showToast(response.message);
      } else {
        showToast(response.message || 'Failed to create order', 'error');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      showToast('Failed to create order', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      setActionLoading(true);
      const response = await orderAPI.updateOrderStatus(orderId, newStatus);
      
      if (response.success) {
        setOrders(prev => prev.map(order => 
          order._id === orderId ? { ...order, status: newStatus, updatedAt: new Date().toISOString() } : order
        ));
        setShowStatusModal(null);
        showToast(response.message);
      } else {
        showToast(response.message || 'Failed to update order status', 'error');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      showToast('Failed to update order status', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      setActionLoading(true);
      const response = await orderAPI.deleteOrder(orderId);
      
      if (response.success) {
        setOrders(prev => prev.filter(order => order._id !== orderId));
        setShowDeleteModal(null);
        showToast(response.message);
      } else {
        showToast(response.message || 'Failed to delete order', 'error');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      showToast('Failed to delete order', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleContactCustomer = async () => {
    if (!contactForm.message.trim()) {
      showToast('Please enter a message', 'error');
      return;
    }

    try {
      setActionLoading(true);
      const response = await orderAPI.contactCustomer(showContactModal._id, contactForm.message);
      
      if (response.success) {
        setShowContactModal(null);
        setContactForm({ message: '' });
        showToast(response.message);
      } else {
        showToast(response.message || 'Failed to send message', 'error');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      showToast('Failed to send message', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.products[0]?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.orderId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return `bg-green-100 text-green-800 border border-green-200`;
      case "processing":
        return `bg-blue-100 text-blue-800 border border-blue-200`;
      case "shipped":
        return `bg-purple-100 text-purple-800 border border-purple-200`;
      case "pending":
        return `bg-orange-100 text-orange-800 border border-orange-200`;
      case "cancelled":
        return `bg-red-100 text-red-800 border border-red-200`;
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const statusCounts = orders.reduce((counts, order) => {
    const status = capitalizeFirst(order.status);
    counts[status] = (counts[status] || 0) + 1;
    return counts;
  }, {});

  if (loading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{
          background: `linear-gradient(to bottom right, ${themeColors.backgroundStart}, ${themeColors.backgroundMiddle}, ${themeColors.backgroundEnd})`
        }}
      >
        <Card className="p-8">
          <LoadingSpinner />
          <p className="text-center mt-4 font-semibold" style={{ color: themeColors.primary }}>
            Loading orders from database...
          </p>
        </Card>
      </div>
    );
  }

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
          <Button 
            className="flex items-center gap-2 text-lg"
            onClick={() => setShowNewOrderModal(true)}
          >
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
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="delivered">Delivered</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </Select>
        </div>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              Showing {filteredOrders.length} of {totalOrders} orders from database
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredOrders.length === 0 ? (
              <div className="text-center py-8">
                <Package className="h-12 w-12 mx-auto mb-4" style={{ color: themeColors.neutral }} />
                <p className="text-lg font-semibold" style={{ color: themeColors.neutral }}>No orders found</p>
                <p className="text-sm" style={{ color: themeColors.neutral }}>Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-gray-200">
                    <tr>
                      <th className="h-12 px-4 text-left align-middle font-semibold" style={{ color: themeColors.neutral }}>Order ID</th>
                      <th className="h-12 px-4 text-left align-middle font-semibold" style={{ color: themeColors.neutral }}>Customer</th>
                      <th className="h-12 px-4 text-left align-middle font-semibold" style={{ color: themeColors.neutral }}>Product</th>
                      <th className="h-12 px-4 text-left align-middle font-semibold" style={{ color: themeColors.neutral }}>Date</th>
                      <th className="h-12 px-4 text-left align-middle font-semibold" style={{ color: themeColors.neutral }}>Status</th>
                      <th className="h-12 px-4 text-left align-middle font-semibold" style={{ color: themeColors.neutral }}>Amount</th>
                      <th className="h-12 px-4 text-right align-middle font-semibold" style={{ color: themeColors.neutral }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order._id} className="border-b transition-all hover:bg-white/60 border-gray-200">
                        <td className="p-4 align-middle font-bold" style={{ color: themeColors.primary }}>{order.orderId}</td>
                        <td className="p-4 align-middle font-semibold" style={{ color: themeColors.neutral }}>{order.customer.name}</td>
                        <td className="p-4 align-middle" style={{ color: themeColors.neutral }}>
                          {order.products[0]?.name} {order.products.length > 1 && `+${order.products.length - 1} more`}
                        </td>
                        <td className="p-4 align-middle" style={{ color: themeColors.neutral }}>{formatDate(order.createdAt)}</td>
                        <td className="p-4 align-middle">
                          <div className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(order.status)}`}>
                            {capitalizeFirst(order.status)}
                          </div>
                        </td>
                        <td className="p-4 align-middle font-bold" style={{ color: themeColors.secondary }}>${order.totalAmount.toFixed(2)}</td>
                        <td className="p-4 align-middle text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setSelectedOrder(order)}
                              className="flex items-center gap-1"
                            >
                              <Eye className="h-4 w-4" />
                              View
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setShowStatusModal(order)}
                              className="flex items-center gap-1"
                            >
                              <Edit className="h-4 w-4" />
                              Status
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setShowContactModal(order)}
                              className="flex items-center gap-1"
                            >
                              <MessageCircle className="h-4 w-4" />
                              Contact
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setShowDeleteModal(order)}
                              className="flex items-center gap-1 text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* New Order Modal */}
        {showNewOrderModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Create New Order</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setShowNewOrderModal(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <CardDescription>Add a new order to the database</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Customer Name *</Label>
                    <Input
                      value={newOrderForm.customerName}
                      onChange={(e) => setNewOrderForm(prev => ({ ...prev, customerName: e.target.value }))}
                      placeholder="Enter customer name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Customer Email</Label>
                    <Input
                      type="email"
                      value={newOrderForm.customerEmail}
                      onChange={(e) => setNewOrderForm(prev => ({ ...prev, customerEmail: e.target.value }))}
                      placeholder="Enter customer email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Customer Phone</Label>
                    <Input
                      value={newOrderForm.customerPhone}
                      onChange={(e) => setNewOrderForm(prev => ({ ...prev, customerPhone: e.target.value }))}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Product Name *</Label>
                    <Input
                      value={newOrderForm.productName}
                      onChange={(e) => setNewOrderForm(prev => ({ ...prev, productName: e.target.value }))}
                      placeholder="Enter product name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Quantity</Label>
                    <Input
                      type="number"
                      min="1"
                      value={newOrderForm.quantity}
                      onChange={(e) => setNewOrderForm(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                      placeholder="Enter quantity"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Amount *</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={newOrderForm.amount}
                      onChange={(e) => setNewOrderForm(prev => ({ ...prev, amount: e.target.value }))}
                      placeholder="Enter amount"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Shipping Method</Label>
                    <Select
                      value={newOrderForm.shippingMethod}
                      onChange={(e) => setNewOrderForm(prev => ({ ...prev, shippingMethod: e.target.value }))}
                    >
                      <option value="standard">Standard Shipping</option>
                      <option value="express">Express Shipping</option>
                      <option value="overnight">Overnight Shipping</option>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Delivery Address</Label>
                  <Input
                    value={newOrderForm.customerAddress}
                    onChange={(e) => setNewOrderForm(prev => ({ ...prev, customerAddress: e.target.value }))}
                    placeholder="Enter delivery address"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setShowNewOrderModal(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateOrder} disabled={actionLoading}>
                    {actionLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating...
                      </div>
                    ) : (
                      "Create Order"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Order Details</CardTitle>
                    <CardDescription>{selectedOrder.orderId}</CardDescription>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setSelectedOrder(null)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Customer Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold" style={{ color: themeColors.primary }}>Customer Information</h4>
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5" style={{ color: themeColors.primary }} />
                      <div>
                        <Label>Name</Label>
                        <p className="text-base font-semibold">{selectedOrder.customer.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5" style={{ color: themeColors.primary }} />
                      <div>
                        <Label>Email</Label>
                        <p className="text-base">{selectedOrder.customer.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5" style={{ color: themeColors.primary }} />
                      <div>
                        <Label>Phone</Label>
                        <p className="text-base">{selectedOrder.customer.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 mt-1" style={{ color: themeColors.primary }} />
                      <div>
                        <Label>Address</Label>
                        <p className="text-base">{selectedOrder.customer.address}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Order Information */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold" style={{ color: themeColors.primary }}>Order Information</h4>
                    <div className="flex items-center gap-3">
                      <ShoppingBag className="h-5 w-5" style={{ color: themeColors.primary }} />
                      <div>
                        <Label>Status</Label>
                        <div className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${getStatusColor(selectedOrder.status)}`}>
                          {capitalizeFirst(selectedOrder.status)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5" style={{ color: themeColors.primary }} />
                      <div>
                        <Label>Order Date</Label>
                        <p className="text-base">{formatDate(selectedOrder.createdAt)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <DollarSign className="h-5 w-5" style={{ color: themeColors.secondary }} />
                      <div>
                        <Label>Total Amount</Label>
                        <p className="text-xl font-bold" style={{ color: themeColors.secondary }}>${selectedOrder.totalAmount.toFixed(2)}</p>
                      </div>
                    </div>
                    {selectedOrder.trackingNumber && (
                      <div className="flex items-center gap-3">
                        <Package className="h-5 w-5" style={{ color: themeColors.primary }} />
                        <div>
                          <Label>Tracking Number</Label>
                          <p className="text-base font-mono">{selectedOrder.trackingNumber}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Products */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold" style={{ color: themeColors.primary }}>Products</h4>
                  <div className="border rounded-lg overflow-hidden">
                    {selectedOrder.products.map((product, index) => (
                      <div key={index} className="flex justify-between items-center p-4 border-b last:border-b-0 bg-gray-50">
                        <div>
                          <p className="font-semibold">{product.name}</p>
                          <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">Qty: {product.quantity}</p>
                          <p className="text-sm" style={{ color: themeColors.secondary }}>${product.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
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

        {/* Status Update Modal */}
        {showStatusModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Update Order Status</CardTitle>
                <CardDescription>Order {showStatusModal.orderId}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Current Status</Label>
                  <div className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${getStatusColor(showStatusModal.status)}`}>
                    {capitalizeFirst(showStatusModal.status)}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>New Status</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(status => (
                      <Button
                        key={status}
                        variant={showStatusModal.status === status ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleUpdateStatus(showStatusModal._id, status)}
                        disabled={actionLoading || showStatusModal.status === status}
                        className="capitalize"
                      >
                        {capitalizeFirst(status)}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setShowStatusModal(null)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Contact Customer Modal */}
        {showContactModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Contact Customer</CardTitle>
                <CardDescription>Send message to {showContactModal.customer.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Message</Label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ message: e.target.value })}
                    placeholder="Enter your message to the customer..."
                    className="flex w-full rounded-lg border-2 border-gray-200 bg-white/80 backdrop-blur-sm px-4 py-3 text-sm font-medium placeholder:font-normal transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 min-h-[100px] resize-none"
                    style={{ 
                      color: themeColors.neutral,
                      '--tw-ring-color': themeColors.primary 
                    }}
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setShowContactModal(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleContactCustomer} disabled={actionLoading}>
                    {actionLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </div>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="text-red-600">Delete Order</CardTitle>
                <CardDescription>Are you sure you want to delete order {showDeleteModal.orderId}?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  This action cannot be undone. The order will be permanently removed from the database.
                </p>
                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setShowDeleteModal(null)}>
                    Cancel
                  </Button>
                  <Button 
                    variant="danger" 
                    onClick={() => handleDeleteOrder(showDeleteModal._id)}
                    disabled={actionLoading}
                  >
                    {actionLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Deleting...
                      </div>
                    ) : (
                      "Delete Order"
                    )}
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