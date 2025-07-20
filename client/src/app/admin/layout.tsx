"use client"

import type React from "react"

import { SidebarNav } from "@/components/sidebar"
import { TopNav } from "@/components/navbar"
import { SidebarProvider } from "@/components/ui/sidebar"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <div
        className="flex min-h-screen flex-col"
        style={{
          backgroundColor: '#F8FAFA',
        }}
      >
        <TopNav />
        <div className="flex flex-1">
          <SidebarNav />
          <main
            className="flex-1 p-6 pt-16 md:p-8 md:pt-16"
            style={{
              color: '#4A5568',
            }}
          >
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}