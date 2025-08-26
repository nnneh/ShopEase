"use client"

import { DashboardCards } from "@/components/dashboard-cards"
import { RecentOrders } from "@/components/recent-orders"
import { RevenueChart } from "@/components/revenue-chart"
import { TopProducts } from "@/components/top-products"

export function DashboardPage() {
  return (
    <div
      className="min-h-screen p-4 flex flex-col items-center" // Add flex-col and items-center to center content if needed
      style={{
        background: `linear-gradient(to bottom right, #E0F2F7, #E8F6F8, #F0F8F9)`
      }}
    >
      <div className="w-full max-w-7xl flex flex-col gap-5 py-4"> {/* Added max-w-7xl for content width control, and py-4 for top/bottom padding within this container */}
        <h1
          className="text-2xl font-bold tracking-tight"
          style={{
            color: '#007bff'
          }}
        >
          Dashboard
        </h1>
        <DashboardCards />
        <div className="grid gap-5 md:grid-cols-2">
          <RevenueChart />
        <TopProducts />
        </div>
        <RecentOrders />
      </div>
    </div>
  )
}

// "use client"

// import { DashboardCards } from "@/components/dashboard-cards"
// import { RecentOrders } from "@/components/recent-orders"
// // import { RevenueChart } from "@/components/revenue-chart"
// import { TopProducts } from "@/components/top-products"


// export function DashboardPage() {
//   return (
//     <div
//       className="min-h-screen p-4" 
//       style={{
//          background: `linear-gradient(to bottom right, #E0F2F7, #E8F6F8, #F0F8F9)`
//       }}
//     >
//       <div className="flex flex-col gap-5">
//         <h1 className="text-2xl font-bold tracking-tight" style={{ color: '#007bff' }}>
//           Dashboard 
//         </h1>
//         <DashboardCards />
//         {/* <div className="grid gap-5 md:grid-cols-2"> */}
//           {/* <RevenueChart /> */}
//           <TopProducts />
//         </div>
//         <RecentOrders />
//       </div>
//     // </div>
//   )
// }