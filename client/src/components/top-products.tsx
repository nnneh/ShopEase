'use client'
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function TopProducts() {
  return (
    <Card className="shop-card-shadow-lg border-0 bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle style={{ color: '#007bff' }}>Top Products</CardTitle>
        <CardDescription style={{ color: '#4A5568' }}>Your best-selling products this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {topProducts.map((product) => (
            <div key={product.id} className="flex items-center">
              <div className="mr-4 h-12 w-12 overflow-hidden rounded-md">
                <img
                  src={product.image || "/placeholder.svg"} // Fallback to placeholder
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none" style={{ color: '#4A5568' }}>{product.name}</p>
                <p className="text-xs" style={{ color: '#4A5568' }}>{product.category}</p>
              </div>
              <div className="font-medium" style={{ color: '#4A5568' }}>${product.price}</div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full h-12 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          style={{
            background: `linear-gradient(to right, #007bff, #28a745)`
          }}
          size="sm"
        >
          View all products
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

const topProducts = [
  {
    id: "1",
    name: "Smart Sleep Ring",
    category: "Wearable Tech",
    price: "249.99",
    image: "/placeholder.svg?height=48&width=48&text=Ring", // Placeholder for image
  },
  {
    id: "2",
    name: "Aromatherapy Diffuser",
    category: "Home Wellness",
    price: "49.99",
    image: "/placeholder.svg?height=48&width=48&text=Diffuser",
  },
  {
    id: "3",
    name: "Sustainable Yoga Mat",
    category: "Fitness & Lifestyle",
    price: "79.99",
    image: "/placeholder.svg?height=48&width=48&text=Yoga",
  },
  {
    id: "4",
    name: "Ergonomic Office Chair",
    category: "Home Office",
    price: "349.99",
    image: "/placeholder.svg?height=48&width=48&text=Chair",
  },
  {
    id: "5",
    name: "Plant-Based Protein Powder",
    category: "Health Supplements",
    price: "39.99",
    image: "/placeholder.svg?height=48&width=48&text=Protein",
  },
]