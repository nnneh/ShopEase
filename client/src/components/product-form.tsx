
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Category {
  id: string
  name: string
}

interface ProductFormData {
  title: string
  description: string
  price: string
  stock: string
  category: string
  images: string[]
}

interface ProductFormProps {
  initialData?: ProductFormData
  categories: Category[]
  onSubmit: (data: ProductFormData) => void
  onCancel: () => void
  isSubmitting?: boolean
}

export default function ProductForm({
  initialData,
  categories,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    images: [],
  })

  // Initialize form with data if provided
  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const addImage = (url: string) => {
    if (url.trim()) {
      setFormData({
        ...formData,
        images: [...formData.images, url.trim()],
      })
    }
  }

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="title" className="text-right">
          Title
        </Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="text-right">
          Description
        </Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="price" className="text-right">
          Price
        </Label>
        <Input
          id="price"
          name="price"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={handleInputChange}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="stock" className="text-right">
          Stock
        </Label>
        <Input
          id="stock"
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleInputChange}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="category" className="text-right">
          Category
        </Label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="images" className="text-right">
          Images
        </Label>
        <div className="col-span-3">
          <Input
            id="imageUrl"
            name="imageUrl"
            placeholder="Enter image URL and press Enter"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                const input = e.target as HTMLInputElement
                addImage(input.value)
                input.value = ""
              }
            }}
            className="mb-2"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.images.map((url, index) => (
              <div key={index} className="flex items-center bg-muted rounded-md p-1">
                <span className="text-xs truncate max-w-[150px]">{url}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 ml-1"
                  onClick={() => removeImage(index)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : initialData ? "Save Changes" : "Add Product"}
        </Button>
      </div>
    </form>
  )
}
