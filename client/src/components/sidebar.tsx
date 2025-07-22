"use client"

import { BarChart3, Box, LayoutDashboard, Package, Settings, ShoppingCart, Store, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"

export function SidebarNav() {
  const pathname = usePathname()


  return (
    <Sidebar
      style={{
        backgroundColor: '#F8FAFC', // Sidebar background
        borderRight: `1px solid #E2E8F0`, // Subtle border on the right
      }}
    >
      <SidebarHeader
        className="flex h-14 items-center px-4"
        style={{ borderBottom: `1px solid #E2E8F0` }} // Separator below header
      >
        <Link href="/" className="flex items-center gap-2 font-semibold" style={{ color: '#007bff' }}>
          <Store className="h-6 w-6" />
          <span>SajiloMart</span>
        </Link>
      </SidebarHeader>
      <SidebarSeparator style={{ backgroundColor: '#E2E8F0' }} /> {/* Separator color */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel style={{ color: '#4A5568', fontWeight: 'bold' }}>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/admin/dashboard"}
                  style={{
                    color: pathname === "/admin/dashboard" ? '#007bff' : '#4A5568',
                    backgroundColor: pathname === "/admin/dashboard" ? '#E0F2F7' : 'transparent',
                    transition: 'background-color 0.2s ease, color 0.2s ease',
                    '--tw-bg-opacity': '1', // Ensure hover background is visible
                    '&:hover': {
                        backgroundColor: '#F0F8F9',
                    }
                  }}
                >
                  <Link href="/admin/dashboard">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/admin/analytics"}
                  style={{
                    color: pathname === "/admin/analytics" ? '#007bff' : '#4A5568',
                    backgroundColor: pathname === "/admin/analytics" ? '#E0F2F7' : 'transparent',
                    transition: 'background-color 0.2s ease, color 0.2s ease',
                    '--tw-bg-opacity': '1',
                    '&:hover': {
                        backgroundColor: '#F0F8F9',
                    }
                  }}
                >
                  <Link href="#">
                    <BarChart3 className="h-4 w-4" />
                    <span>Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator style={{ backgroundColor: '#E2E8F0' }} />
        <SidebarGroup>
          <SidebarGroupLabel style={{ color: '#4A5568', fontWeight: 'bold' }}>Store Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/admin/orders"}
                  style={{
                    color: pathname === "/admin/orders" ? '#007bff' : '#4A5568',
                    backgroundColor: pathname === "/admin/orders" ? '#E0F2F7' : 'transparent',
                    transition: 'background-color 0.2s ease, color 0.2s ease',
                    '--tw-bg-opacity': '1',
                    '&:hover': {
                        backgroundColor: '#F0F8F9',
                    }
                  }}
                >
                  <Link href="#">
                    <ShoppingCart className="h-4 w-4" />
                    <span>Orders</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/admin/product"}
                  style={{
                    color: pathname === "/admin/product" ? '#007bff' : '#4A5568',
                    backgroundColor: pathname === "/admin/product" ? '#E0F2F7' : 'transparent',
                    transition: 'background-color 0.2s ease, color 0.2s ease',
                    '--tw-bg-opacity': '1',
                    '&:hover': {
                        backgroundColor: '#F0F8F9',
                    }
                  }}
                >
                  <Link href="/admin/product">
                    <Package className="h-4 w-4" />
                    <span>Products</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/admin/category"}
                  style={{
                    color: pathname === "/admin/category" ? '#007bff' : '#4A5568',
                    backgroundColor: pathname === "/admin/category" ? '#E0F2F7' : 'transparent',
                    transition: 'background-color 0.2s ease, color 0.2s ease',
                    '--tw-bg-opacity': '1',
                    '&:hover': {
                        backgroundColor: '#F0F8F9',
                    }
                  }}
                >
                  <Link href="/admin/category">
                    <Box className="h-4 w-4" />
                    <span>Categories</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/admin/customer"}
                  style={{
                    color: pathname === "/admin/customer" ? '#007bff' : '#4A5568',
                    backgroundColor: pathname === "/admin/customer" ? '#E0F2F7' : 'transparent',
                    transition: 'background-color 0.2s ease, color 0.2s ease',
                    '--tw-bg-opacity': '1',
                    '&:hover': {
                        backgroundColor: '#F0F8F9',
                    }
                  }}
                >
                  <Link href="/admin/customer">
                    <Users className="h-4 w-4" />
                    <span>Customers</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter style={{ borderTop: `1px solid #E2E8F0` }}>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/admin/settings"}
              style={{
                color: pathname === "/admin/settings" ? '#007bff' : '#4A5568',
                backgroundColor: pathname === "/admin/settings" ? '#E0F2F7' : 'transparent',
                transition: 'background-color 0.2s ease, color 0.2s ease',
                '--tw-bg-opacity': '1',
                '&:hover': {
                    backgroundColor: '#F0F8F9',
                }
              }}
            >
              <Link href="#">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}