"use client"

import { useEffect, useState } from "react"
import { Plus, Pencil, Trash2, Filter, Loader2, Package, ShoppingCart, Star, Eye } from "lucide-react"
import React from "react"

// API Base URL from environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

// Mock toast function for demonstration (replace with your actual toast library)
const toast = {
  success: (message: string) => console.log("Success:", message),
  error: (message: string) => console.error("Error:", message),
}

// Your existing interfaces
interface Product {
  id: number
  title: string
  description: string
  price: number
  stock: number
  category: Category
  images: string[]
  averageRating: number
}

interface Category {
  _id: string
  name: string
  description?: string
  image?: string
  itemCount?: number
  status?: string
  createdAt?: string
  updatedAt?: string
  __v?: number
}

interface ProductFormData {
  title: string
  description: string
  price: string
  stock: string
  category: string
  images: string[]
}

// --- Button Component ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  variant?: "default" | "outline" | "ghost" | "destructive"
  size?: "default" | "sm" | "icon"
  className?: string
  disabled?: boolean
  type?: "button" | "submit" | "reset"
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "default",
  size = "default",
  className = "",
  disabled = false,
  type = "button",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"

  const variants = {
    default:
      "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:ring-blue-500",
    outline:
      "border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-gray-700 hover:text-blue-700 bg-white",
    ghost: "hover:bg-gray-100 text-gray-600 hover:text-gray-900",
    destructive:
      "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:ring-red-500",
  }

  const sizes = {
    default: "px-6 py-3 text-sm",
    sm: "px-4 py-2 text-sm",
    icon: "p-2",
  }

  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

// --- Card Components ---
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Card: React.FC<CardProps> = ({ children, className = "", ...props }) => (
  <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden ${className}`} {...props}>
    {children}
  </div>
)

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const CardHeader: React.FC<CardHeaderProps> = ({ children, className = "", ...props }) => (
  <div className={`p-8 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 ${className}`} {...props}>
    {children}
  </div>
)

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

const CardTitle: React.FC<CardTitleProps> = ({ children, className = "", ...props }) => (
  <h3 className={`text-2xl font-bold text-gray-900 mb-2 ${className}`} {...props}>
    {children}
  </h3>
)

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

const CardDescription: React.FC<CardDescriptionProps> = ({ children, className = "", ...props }) => (
  <p className={`text-gray-600 text-lg ${className}`} {...props}>
    {children}
  </p>
)

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const CardContent: React.FC<CardContentProps> = ({ children, className = "", ...props }) => (
  <div className={`p-8 ${className}`} {...props}>
    {children}
  </div>
)

// --- Table Components ---
interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children: React.ReactNode
}

const Table: React.FC<TableProps> = ({ children, className = "", ...props }) => (
  <div className="overflow-x-auto rounded-xl border border-gray-200">
    <table className={`w-full ${className}`} {...props}>
      {children}
    </table>
  </div>
)

interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode
}

const TableHeader: React.FC<TableHeaderProps> = ({ children, ...props }) => (
  <thead className="bg-gradient-to-r from-gray-50 to-gray-100" {...props}>
    {children}
  </thead>
)

interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode
}

const TableBody: React.FC<TableBodyProps> = ({ children, ...props }) => (
  <tbody className="divide-y divide-gray-200 bg-white" {...props}>
    {children}
  </tbody>
)

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode
}

const TableRow: React.FC<TableRowProps> = ({ children, className = "", ...props }) => (
  <tr className={`hover:bg-gray-50 transition-colors duration-150 ${className}`} {...props}>
    {children}
  </tr>
)

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableHeaderCellElement> {
  children: React.ReactNode
}

const TableHead: React.FC<TableHeadProps> = ({ children, className = "", ...props }) => (
  <th
    className={`px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider ${className}`}
    {...props}
  >
    {children}
  </th>
)

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableDataCellElement> {
  children: React.ReactNode
}

const TableCell: React.FC<TableCellProps> = ({ children, className = "", ...props }) => (
  <td className={`px-6 py-4 text-sm text-gray-700 ${className}`} {...props}>
    {children}
  </td>
)

// --- Dialog Components ---
interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full m-4 max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  )
}

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const DialogContent: React.FC<DialogContentProps> = ({ children, className = "", ...props }) => (
  <div className={`${className}`} {...props}>
    {children}
  </div>
)

interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const DialogHeader: React.FC<DialogHeaderProps> = ({ children, className = "", ...props }) => (
  <div className={`p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white ${className}`} {...props}>
    {children}
  </div>
)

interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

const DialogTitle: React.FC<DialogTitleProps> = ({ children, className = "", ...props }) => (
  <h2 className={`text-xl font-bold text-gray-900 ${className}`} {...props}>
    {children}
  </h2>
)

interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

const DialogDescription: React.FC<DialogDescriptionProps> = ({ children, className = "", ...props }) => (
  <p className={`text-gray-600 mt-2 ${className}`} {...props}>
    {children}
  </p>
)

// --- Dropdown Menu Components ---
interface DropdownMenuProps {
  children: React.ReactNode
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const childrenArray = React.Children.toArray(children)
  return (
    <div className="relative">
      {childrenArray.map((child, index) => {
        if (React.isValidElement(child)) {
          if (child.type === DropdownMenuTrigger) {
            return React.cloneElement(child as React.ReactElement<DropdownMenuTriggerProps>, {
              key: index,
              onClick: () => setIsOpen(!isOpen),
            })
          }
          if (child.type === DropdownMenuContent && isOpen) {
            const contentProps = child.props as DropdownMenuContentProps
            return (
              <div key={index}>
                <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                <div
                  className={`absolute top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-50 py-2 ${contentProps.align === "end" ? "right-0" : "left-0"}`}
                >
                  {contentProps.children}
                </div>
              </div>
            )
          }
        }
        return null
      })}
    </div>
  )
}

interface DropdownMenuTriggerProps {
  children: React.ReactNode
  asChild?: boolean
  onClick?: () => void
}

const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({ children, asChild, ...props }) => {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, props)
  }
  return <div {...props}>{children}</div>
}

interface DropdownMenuContentProps {
  children: React.ReactNode
  align?: "start" | "end"
}

const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({ children, align = "start" }) => <>{children}</>

interface DropdownMenuCheckboxItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

const DropdownMenuCheckboxItem: React.FC<DropdownMenuCheckboxItemProps> = ({
  children,
  checked,
  onCheckedChange,
  ...props
}) => (
  <div
    className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 flex items-center space-x-2"
    onClick={() => onCheckedChange(!checked)}
    {...props}
  >
    <div
      className={`w-4 h-4 rounded border-2 flex items-center justify-center ${checked ? "bg-blue-600 border-blue-600" : "border-gray-300"}`}
    >
      {checked && <div className="w-2 h-2 bg-white rounded-sm" />}
    </div>
    <span>{children}</span>
  </div>
)

// Enhanced API Functions with better error handling
const apiRequest = async (url: string, options: RequestInit = {}) => {
  try {
    console.log("Making API request to:", url)
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    })

    console.log("Response status:", response.status)
    console.log("Response headers:", Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorText = await response.text()
      console.error("API Error Response:", errorText)
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
    }

    const data = await response.json()
    console.log("API Response data:", data)
    return data
  } catch (error) {
    console.error("API Request failed:", error)
    throw error
  }
}

// ProductForm Component with enhanced debugging
interface ProductFormProps {
  initialData?: ProductFormData
  categories: Category[]
  onSubmit: (formData: ProductFormData) => void
  onCancel: () => void
  isSubmitting: boolean
  isCategoriesLoading?: boolean
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
  onSubmit,
  onCancel,
  isSubmitting,
  isCategoriesLoading = false,
}) => {
  const [formData, setFormData] = useState<ProductFormData>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    stock: initialData?.stock || "",
    category: initialData?.category || "",
    images: initialData?.images || [],
  })

  const handleSubmit = () => {
    // Validate form before submission
    if (!formData.title.trim()) {
      toast.error("Product title is required")
      return
    }
    if (!formData.category) {
      toast.error("Please select a category")
      return
    }
    if (!formData.price || Number.parseFloat(formData.price) <= 0) {
      toast.error("Please enter a valid price")
      return
    }
    if (!formData.stock || Number.parseInt(formData.stock) < 0) {
      toast.error("Please enter a valid stock quantity")
      return
    }

    // Additional validation: Check if selected category exists
    const selectedCategory = categories.find((cat) => cat._id === formData.category)
    if (!selectedCategory) {
      toast.error("Selected category is invalid. Please choose a different category.")
      return
    }

    console.log("Form validation passed. Selected category:", selectedCategory)
    onSubmit(formData)
  }

  // Enhanced debugging
  console.log("ProductForm - Categories received:", categories)
  console.log("ProductForm - Categories length:", categories?.length || 0)
  console.log("ProductForm - Is categories loading:", isCategoriesLoading)

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
            Product Title
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter product title"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 h-24 resize-none"
            placeholder="Enter product description"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
              Price ($)
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <label htmlFor="stock" className="block text-sm font-semibold text-gray-700 mb-2">
              Stock
            </label>
            <input
              id="stock"
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="0"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
            Category
          </label>
          {isCategoriesLoading ? (
            <div className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 flex items-center">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              <span className="text-gray-500">Loading categories...</span>
            </div>
          ) : (
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            >
              <option value="">Select a category</option>
              {categories && categories.length > 0 ? (
                categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No categories available
                </option>
              )}
            </select>
          )}
          {!isCategoriesLoading && categories.length === 0 && (
            <p className="text-sm text-red-500 mt-1">
              No categories found. Please add categories first or check your API connection.
            </p>
          )}
          {!isCategoriesLoading && categories.length > 0 && (
            <p className="text-sm text-green-600 mt-1">{categories.length} categories loaded successfully</p>
          )}
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Product"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function ProductAdmin() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      const data = await apiRequest(`${API_BASE_URL}/products`)
      setProducts(data)
    } catch (error) {
      console.error("Error fetching products:", error)
      toast.error("Failed to fetch products")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      setIsCategoriesLoading(true)
      console.log("=== FETCHING CATEGORIES ===")
      console.log("API_BASE_URL:", API_BASE_URL)

      // Try multiple possible endpoints
      const possibleEndpoints = [
        `${API_BASE_URL}/categories`,
        `${API_BASE_URL}/category`,
        `${API_BASE_URL}/api/categories`,
        `${API_BASE_URL}/api/category`,
      ]

      let categoriesData: Category[] = []
      let successfulEndpoint = ""

      for (const endpoint of possibleEndpoints) {
        try {
          console.log(`Trying endpoint: ${endpoint}`)
          const data = await apiRequest(endpoint)
          console.log(`Success with endpoint ${endpoint}:`, data)

          // Handle different possible response formats
          if (Array.isArray(data)) {
            categoriesData = data
          } else if (data.data && Array.isArray(data.data)) {
            categoriesData = data.data
          } else if (data.categories && Array.isArray(data.categories)) {
            categoriesData = data.categories
          } else if (data.result && Array.isArray(data.result)) {
            categoriesData = data.result
          } else {
            console.warn("Unexpected category response format:", data)
            continue
          }

          successfulEndpoint = endpoint
          break
        } catch (error) {
          console.log(`Failed with endpoint ${endpoint}:`, error)
          continue
        }
      }

      if (successfulEndpoint) {
        console.log(`Successfully fetched categories from: ${successfulEndpoint}`)
        console.log("Processed categories:", categoriesData)
        setCategories(categoriesData)
        toast.success(`Loaded ${categoriesData.length} categories`)
      } else {
        console.error("All category endpoints failed")
        toast.error("Failed to fetch categories from any endpoint")
        setCategories([])
      }
    } catch (error) {
      console.error("Error in fetchCategories:", error)
      toast.error("Failed to fetch categories")
      setCategories([])
    } finally {
      setIsCategoriesLoading(false)
    }
  }

  const handleAddProduct = async (formData: ProductFormData) => {
    try {
      setIsSubmitting(true)

      // Debug: Log what we're about to send
      console.log("=== ADDING PRODUCT ===")
      console.log("Form data:", formData)
      console.log("Selected category ID:", formData.category)

      // Enhanced payload with multiple category formats for debugging
      const selectedCategory = categories.find((cat) => cat._id === formData.category)
      console.log("Selected category object:", selectedCategory)

      // Try the most common format first
      let payload = {
        title: formData.title,
        description: formData.description,
        price: Number.parseFloat(formData.price),
        stock: Number.parseInt(formData.stock),
        category: formData.category, // Send as ObjectId string
        images: formData.images,
      }

      console.log("Attempting with payload format 1 (category as ObjectId):", payload)

      try {
        const response = await apiRequest(`${API_BASE_URL}/products`, {
          method: "POST",
          body: JSON.stringify(payload),
        })
        console.log("Success with format 1!")
        console.log("Product creation response:", response)
        toast.success("Product added successfully")
        setIsAddDialogOpen(false)
        fetchProducts()
        return
      } catch (error1) {
        console.log("Format 1 failed, trying format 2...")

        // Try format 2: categoryId instead of category
        payload = {
          title: formData.title,
          description: formData.description,
          price: Number.parseFloat(formData.price),
          stock: Number.parseInt(formData.stock),
          categoryId: formData.category,
          images: formData.images,
        }

        console.log("Attempting with payload format 2 (categoryId):", payload)

        try {
          const response = await apiRequest(`${API_BASE_URL}/products`, {
            method: "POST",
            body: JSON.stringify(payload),
          })
          console.log("Success with format 2!")
          console.log("Product creation response:", response)
          toast.success("Product added successfully")
          setIsAddDialogOpen(false)
          fetchProducts()
          return
        } catch (error2) {
          console.log("Format 2 failed, trying format 3...")

          // Try format 3: Full category object
          payload = {
            title: formData.title,
            description: formData.description,
            price: Number.parseFloat(formData.price),
            stock: Number.parseInt(formData.stock),
            category: selectedCategory, // Send full category object
            images: formData.images,
          }

          console.log("Attempting with payload format 3 (full category object):", payload)

          try {
            const response = await apiRequest(`${API_BASE_URL}/products`, {
              method: "POST",
              body: JSON.stringify(payload),
            })
            console.log("Success with format 3!")
            console.log("Product creation response:", response)
            toast.success("Product added successfully")
            setIsAddDialogOpen(false)
            fetchProducts()
            return
          } catch (error3) {
            console.log("Format 3 failed, trying format 4...")

            // Try format 4: Category name as string
            payload = {
              title: formData.title,
              description: formData.description,
              price: Number.parseFloat(formData.price),
              stock: Number.parseInt(formData.stock),
              category: selectedCategory?.name, // Send category name
              images: formData.images,
            }

            console.log("Attempting with payload format 4 (category name):", payload)

            try {
              const response = await apiRequest(`${API_BASE_URL}/products`, {
                method: "POST",
                body: JSON.stringify(payload),
              })
              console.log("Success with format 4!")
              console.log("Product creation response:", response)
              toast.success("Product added successfully")
              setIsAddDialogOpen(false)
              fetchProducts()
              return
            } catch (error4) {
              console.log("All formats failed!")
              console.error("Error 1 (ObjectId):", error1)
              console.error("Error 2 (categoryId):", error2)
              console.error("Error 3 (full object):", error3)
              console.error("Error 4 (category name):", error4)

              toast.error("Failed to add product. Check console for detailed error information.")
            }
          }
        }
      }
    } catch (error) {
      console.error("Error adding product:", error)

      // Enhanced error handling
      if (error instanceof Error) {
        if (error.message.includes("Category not found")) {
          toast.error("Selected category not found. Please refresh and try again.")
          // Refresh categories
          fetchCategories()
        } else {
          toast.error(`Failed to add product: ${error.message}`)
        }
      } else {
        toast.error("Failed to add product")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditProduct = async (formData: ProductFormData) => {
    if (!currentProduct) return
    try {
      setIsSubmitting(true)

      // Debug: Log what we're about to send
      console.log("=== EDITING PRODUCT ===")
      console.log("Form data:", formData)
      console.log("Selected category ID:", formData.category)

      // Find the selected category to get full details
      const selectedCategory = categories.find((cat) => cat._id === formData.category)
      console.log("Selected category object:", selectedCategory)

      // Prepare the payload - try different formats that your API might expect
      const payload = {
        title: formData.title,
        description: formData.description,
        price: Number.parseFloat(formData.price),
        stock: Number.parseInt(formData.stock),
        // Try different category field formats
        category: formData.category, // MongoDB ObjectId
        categoryId: formData.category, // Alternative field name
        categoryName: selectedCategory?.name, // Category name as backup
        images: formData.images,
      }

      console.log("Payload being sent:", payload)

      const response = await apiRequest(`${API_BASE_URL}/products/${currentProduct.id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      })

      console.log("Product update response:", response)
      toast.success("Product updated successfully")
      setIsEditDialogOpen(false)
      fetchProducts()
    } catch (error) {
      console.error("Error updating product:", error)

      // Enhanced error handling
      if (error instanceof Error) {
        if (error.message.includes("Category not found")) {
          toast.error("Selected category not found. Please refresh and try again.")
          // Refresh categories
          fetchCategories()
        } else {
          toast.error(`Failed to update product: ${error.message}`)
        }
      } else {
        toast.error("Failed to update product")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteProduct = async () => {
    if (!currentProduct) return
    try {
      await apiRequest(`${API_BASE_URL}/products/${currentProduct.id}`, {
        method: "DELETE",
      })
      toast.success("Product deleted successfully")
      setIsDeleteDialogOpen(false)
      fetchProducts()
    } catch (error) {
      console.error("Error deleting product:", error)
      toast.error("Failed to delete product")
    }
  }

  const openEditDialog = (product: Product) => {
    setCurrentProduct(product)
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (product: Product) => {
    setCurrentProduct(product)
    setIsDeleteDialogOpen(true)
  }

  const toggleCategoryFilter = (categoryName: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryName)) {
        return prev.filter((cat) => cat !== categoryName)
      } else {
        return [...prev, categoryName]
      }
    })
  }

  const filteredProducts = selectedCategories.length
    ? products.filter((product) => selectedCategories.includes(product?.category?.name))
    : products

  const getEditFormData = (): ProductFormData | undefined => {
    if (!currentProduct) return undefined
    return {
      title: currentProduct.title,
      description: currentProduct.description,
      price: currentProduct.price.toString(),
      stock: currentProduct.stock.toString(),
      category: currentProduct.category?._id || "",
      images: currentProduct.images || [],
    }
  }

  const totalProducts = products.length
  const totalValue = products.reduce((sum, product) => sum + product.price * product.stock, 0)
  const lowStockProducts = products.filter((product) => product.stock < 20).length

  // Enhanced debugging
  console.log("=== MAIN COMPONENT STATE ===")
  console.log("Categories:", categories)
  console.log("Categories length:", categories.length)
  console.log("Is categories loading:", isCategoriesLoading)
  console.log("API_BASE_URL:", API_BASE_URL)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto py-10 px-4">
        {/* Debug Panel - Remove in production */}
        {/* <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">Debug Information:</h4>
          <div className="text-sm text-yellow-700 space-y-1">
            <p>
              <strong>API Base URL:</strong> {API_BASE_URL || "Not set"}
            </p>
            <p>
              <strong>Categories loaded:</strong> {categories.length}
            </p>
            <p>
              <strong>Categories loading:</strong> {isCategoriesLoading ? "Yes" : "No"}
            </p>
            <p>
              <strong>Categories data:</strong> {JSON.stringify(categories.slice(0, 2))}...
            </p>
          </div>
          <Button size="sm" variant="outline" onClick={fetchCategories} className="mt-2 bg-transparent">
            Retry Fetch Categories
          </Button>
        </div> */}

        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Total Products</p>
                <p className="text-3xl font-bold text-gray-900">{totalProducts}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Total Value</p>
                <p className="text-3xl font-bold text-gray-900">${totalValue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <ShoppingCart className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Low Stock Alert</p>
                <p className="text-3xl font-bold text-red-600">{lowStockProducts}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-xl">
                <Eye className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Package className="mr-3 h-8 w-8 text-blue-600" />
                Product Management
              </CardTitle>
              <CardDescription>Manage your products: add, edit, delete, and filter by category.</CardDescription>
            </div>
            <div className="flex space-x-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="relative bg-transparent">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                    {selectedCategories.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {selectedCategories.length}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {categories.map((category) => (
                    <DropdownMenuCheckboxItem
                      key={category._id}
                      checked={selectedCategories.includes(category.name)}
                      onCheckedChange={() => toggleCategoryFilter(category.name)}
                    >
                      {category.name}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-center">
                  <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
                  <p className="text-gray-600">Loading products...</p>
                </div>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12">
                        <div className="text-gray-500">
                          <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p className="text-lg font-medium">No products found</p>
                          <p className="text-sm">Try adjusting your filters or add a new product</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div>
                            <div className="font-semibold text-gray-900">{product.title}</div>
                            <div className="text-sm text-gray-500 mt-1">{product.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {product.category ? product.category.name : "Unknown"}
                          </span>
                        </TableCell>
                        <TableCell className="font-semibold text-gray-900">${product.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              product.stock < 20
                                ? "bg-red-100 text-red-800"
                                : product.stock < 50
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                            }`}
                          >
                            {product.stock}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 mr-1 fill-current" />
                            <span className="text-sm font-medium">{product.averageRating.toFixed(1)}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEditDialog(product)}
                              className="hover:bg-blue-50 hover:text-blue-600"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openDeleteDialog(product)}
                              className="hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Add Product Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>Fill in the details for the new product.</DialogDescription>
            </DialogHeader>
            <ProductForm
              categories={categories}
              onSubmit={handleAddProduct}
              onCancel={() => setIsAddDialogOpen(false)}
              isSubmitting={isSubmitting}
              isCategoriesLoading={isCategoriesLoading}
            />
          </DialogContent>
        </Dialog>

        {/* Edit Product Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
              <DialogDescription>Update the product details.</DialogDescription>
            </DialogHeader>
            <ProductForm
              initialData={getEditFormData()}
              categories={categories}
              onSubmit={handleEditProduct}
              onCancel={() => setIsEditDialogOpen(false)}
              isSubmitting={isSubmitting}
              isCategoriesLoading={isCategoriesLoading}
            />
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-red-600">Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{currentProduct?.title}"? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-3 mt-6 p-6 border-t border-gray-200">
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteProduct}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Product
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
