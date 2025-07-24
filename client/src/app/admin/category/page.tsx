"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Edit, Trash2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";

interface Category {
  _id: string;
  name: string;
  description: string;
  image?: string;
  itemCount?: number;
  status?: "active" | "inactive";
  createdAt: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/categories");
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      console.error("Fetch error details:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (): Promise<string> => {
    if (!imageFile) return "";

    setIsUploading(true);
    try {
      const uploadData = new FormData();
      uploadData.append('image', imageFile);

      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
      const response = await axios.post(`${API_BASE_URL}/upload`, uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data.imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", image: "" });
    setImageFile(null);
    setImagePreview("");
  };

  const handleCreateCategory = async () => {
    if (!formData.name.trim() || !formData.description.trim()) {
      return;
    }
    
    try {
      let imageUrl = "";
      
      // Upload image if selected
      if (imageFile) {
        imageUrl = await uploadImage();
      }

      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
      const response = await axios.post(`${API_BASE_URL}/categories`, {
        name: formData.name,
        description: formData.description,
        image: imageUrl,
      });
      
      if (response.data) {
        await fetchCategories();
        resetForm();
        setIsCreateDialogOpen(false);
      }
    } catch (error) {
      console.error("Error creating category:", error);
      console.error("Full error details:", error.response?.data || error.message);
    }
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      image: category.image || "",
    });
    
    // Set preview to existing image if available
    if (category.image) {
      setImagePreview(category.image);
    }
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory || !formData.name.trim() || !formData.description.trim()) {
      return;
    }
    
    try {
      let imageUrl = formData.image; // Keep existing image by default
      
      // Upload new image if selected
      if (imageFile) {
        imageUrl = await uploadImage();
      }

      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
      const response = await axios.patch(
        `${API_BASE_URL}/categories/${editingCategory._id}`,
        {
          name: formData.name,
          description: formData.description,
          image: imageUrl,
        }
      );
      
      if (response.data) {
        await fetchCategories();
        setEditingCategory(null);
        resetForm();
      }
    } catch (error) {
      console.error("Error updating category:", error);
      console.error("Full error details:", error.response?.data || error.message);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      const { data } = await axios.delete(
        "http://localhost:8080/categories/" + id
      );
      if (data) fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
    setFormData({ ...formData, image: "" });
  };

  const ImageUploadSection = () => (
    <div className="grid gap-2">
      <Label htmlFor="image">Category Image</Label>
      <div className="space-y-4">
        {/* File Input */}
        <div className="flex items-center gap-4">
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border-blue-200 focus:border-blue-400"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="shrink-0"
            onClick={() => document.getElementById('image')?.click()}
          >
            <Upload className="h-4 w-4 mr-2" />
            Browse
          </Button>
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="relative inline-block">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="w-32 h-32 object-cover rounded-lg border-2 border-blue-200"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full bg-red-100 hover:bg-red-200 border-red-300"
              onClick={removeImage}
            >
              <X className="h-3 w-3 text-red-600" />
            </Button>
          </div>
        )}

        {/* Upload Status */}
        {isUploading && (
          <div className="text-sm text-blue-600">
            Uploading image...
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Product Categories
          </h1>
          <p className="text-gray-600">
            Manage your product categories and organize your inventory
          </p>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-blue-200 focus:border-blue-400"
            />
          </div>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={(open) => {
              setIsCreateDialogOpen(open);
              if (!open) {
                resetForm();
              }
            }}
          >
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-blue-700">
                  Create New Category
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Category Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter category name"
                    className="border-blue-200 focus:border-blue-400"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Enter category description"
                    className="border-blue-200 focus:border-blue-400"
                  />
                </div>
                <ImageUploadSection />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    resetForm();
                    setIsCreateDialogOpen(false);
                  }}
                  className="border-blue-200 text-blue-700 hover:bg-blue-50"
                  disabled={isUploading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateCategory}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={!formData.name.trim() || !formData.description.trim() || isUploading}
                >
                  {isUploading ? "Creating..." : "Create Category"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Categories</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {categories.length}
                  </p>
                </div>
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="h-4 w-4 bg-blue-500 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Categories</p>
                  <p className="text-2xl font-bold text-green-600">
                    {categories.filter((cat) => cat.status === "active").length}
                  </p>
                </div>
                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="h-4 w-4 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Products</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {categories.reduce((sum, cat) => sum + (cat.itemCount || 0), 0)}
                  </p>
                </div>
                <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <div className="h-4 w-4 bg-purple-500 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Inactive Categories</p>
                  <p className="text-2xl font-bold text-gray-600">
                    {
                      categories.filter((cat) => cat.status === "inactive")
                        .length
                    }
                  </p>
                </div>
                <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <div className="h-4 w-4 bg-gray-500 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <Card
              key={category._id}
              className="border-blue-200 hover:shadow-lg transition-shadow"
            >
              <CardHeader className="p-4 pb-2">
                <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mb-2 overflow-hidden">
                  {category.image ? (
                    <img 
                      src={`http://localhost:8080${category.image}`}
                      alt={category.name}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        // Fallback if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                  ) : (
                    <div className="text-blue-500 text-4xl font-bold">
                      {category.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  
                  {/* Fallback content for failed image loads */}
                  {category.image && (
                    <div className="text-blue-500 text-4xl font-bold" style={{ display: 'none' }}>
                      {category.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-lg text-gray-900">
                    {category.name}
                  </CardTitle>
                  <Badge
                    variant={
                      category.status === "active" ? "default" : "secondary"
                    }
                    className={
                      category.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }
                  >
                    {category.status}
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {category.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{category.itemCount || 0} products</span>
                  <span>Created: {new Date(category.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex gap-2">
                  <Dialog
                    open={editingCategory?._id === category._id}
                    onOpenChange={(open) => {
                      if (!open) {
                        setEditingCategory(null);
                        resetForm();
                      }
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditCategory(category)}
                        className="flex-1 border-blue-200 text-blue-700 hover:bg-blue-50"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle className="text-blue-700">
                          Edit Category
                        </DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="edit-name">Category Name</Label>
                          <Input
                            id="edit-name"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="border-blue-200 focus:border-blue-400"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="edit-description">Description</Label>
                          <Textarea
                            id="edit-description"
                            value={formData.description}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                description: e.target.value,
                              })
                            }
                            className="border-blue-200 focus:border-blue-400"
                          />
                        </div>
                        <ImageUploadSection />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setEditingCategory(null);
                            resetForm();
                          }}
                          className="border-blue-200 text-blue-700 hover:bg-blue-50"
                          disabled={isUploading}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleUpdateCategory}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          disabled={!formData.name.trim() || !formData.description.trim() || isUploading}
                        >
                          {isUploading ? "Updating..." : "Update Category"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-200 text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the category "{category.name}" and all
                          associated data.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="border-blue-200 text-blue-700 hover:bg-blue-50">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteCategory(category._id)}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No categories found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Get started by creating your first category"}
            </p>
            {!searchTerm && (
              <Button
                onClick={() => setIsCreateDialogOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Category
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}