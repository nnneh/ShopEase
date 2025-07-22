"use client"

import { Bell, Search, User, LogOut, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation" // Changed from "next/router"
import { logoutUser } from "@/redux/reducerSlices/userSlice"

export function TopNav() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { role } = useSelector(state => state.user)
  
  const handleLogout = () => {
    dispatch(logoutUser())
    router.push("/login")
  }

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
              <Search className="absolute left-2.5 top-2.5 h-4 w-4" style={{ color: '#4A5568' }} />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[300px] lg:w-[400px]"
                style={{
                  backgroundColor: '#F0F8F9', 
                  border: '1px solid #E2E8F0', 
                  color: '#4A5568', 
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
            }}
          >
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          
          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                style={{
                  color: '#4A5568', 
                  backgroundColor: 'transparent',
                  transition: 'background-color 0.2s ease, color 0.2s ease',
                }}
              >
                <User className="h-5 w-5" />
                <span className="sr-only">Profile</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem 
                onClick={handleLogout}
                className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}