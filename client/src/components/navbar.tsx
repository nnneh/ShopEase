"use client"

import { Bell, Search, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function TopNav() {
  return (
    <header
      className="fixed top-0 z-40 w-full"
      style={{
        backgroundColor: '#F8FAFC', 
        borderBottom: '1px solid #E2E8F0', 
      }}
    >
      <div className="flex h-14 items-center gap-4 px-4 sm:px-6">
        <SidebarTrigger
          style={{ color: '#4A5568' }} 
        />
        <div className="hidden md:flex md:flex-1 md:items-center md:gap-4">
          <form className="flex-1 md:max-w-sm lg:max-w-md">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4" style={{ color: '#4A5568' }} /> {/* Neutral color for search icon */}
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[300px] lg:w-[400px]"
                style={{
                  backgroundColor: '#F0F8F9', 
                  border: '1px solid #E2E8F0', 
                  color: '#4A5568', 
                  '::placeholder': { 
                    color: '#6B7280', 
                  },
                }}
              />
            </div>
          </form>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            style={{
              color: '#4A5568', 
              backgroundColor: 'transparent',
              
              transition: 'background-color 0.2s ease, color 0.2s ease',
              '&:hover': {
                  backgroundColor: '#E8F6F8', 
              }
            }}
          >
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            style={{
              color: '#4A5568', 
              backgroundColor: 'transparent',

              transition: 'background-color 0.2s ease, color 0.2s ease',
              '&:hover': {
                  backgroundColor: '#E8F6F8', 
              }
            }}
          >
            <User className="h-5 w-5" />
            <span className="sr-only">Profile</span>
          </Button>
        </div>
      </div>
    </header>
  )
}