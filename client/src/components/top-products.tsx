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
              <div className="mr-4 h-12 w-12 overflow-hidden rounded-md bg-gray-100 flex items-center justify-center">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      // Fallback to text when image fails to load
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div 
                  className="h-full w-full flex items-center justify-center text-xs font-medium text-gray-500"
                  style={{ display: product.image ? 'none' : 'flex' }}
                >
                  {product.text}
                </div>
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
    image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=48&h=48&fit=crop&crop=center",
    text: "Ring"
  },
  {
    id: "2",
    name: "Aromatherapy Diffuser",
    category: "Home Wellness",
    price: "49.99",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=48&h=48&fit=crop&crop=center",
    text: "Diffuser"
  },
  {
    id: "3",
    name: "Sustainable Yoga Mat",
    category: "Fitness & Lifestyle",
    price: "79.99",
    image: "https://images.unsplash.com/photo-1506629905607-5d619d62c6fa?w=48&h=48&fit=crop&crop=center",
    text: "Yoga"
  },
  {
    id: "4",
    name: "Ergonomic Office Chair",
    category: "Home Office",
    price: "349.99",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=48&h=48&fit=crop&crop=center",
    text: "Chair"
  },
  {
    id: "5",
    name: "Plant-Based Protein Powder",
    category: "Health Supplements",
    price: "39.99",
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=48&h=48&fit=crop&crop=center",
    text: "Protein"
  },]