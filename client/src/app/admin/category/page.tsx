"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
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
  image: string;
  itemCount: number;
  status: "active" | "inactive";
  emoji: string;
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
  });

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchCategories = async () => {
    const { data } = await axios.get("http://localhost:8080/categories");
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateCategory = async () => {
    await axios.post(process.env.NEXT_PUBLIC_API_URL + "/categories", {
      name: formData.name,
      description: formData.description,
    });
    fetchCategories();
    setFormData({ name: "", description: "", emoji: "" });
    setIsCreateDialogOpen(false);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
    });
  };

  const handleUpdateCategory = () => {
    if (editingCategory && formData.name && formData.description) {
      setCategories(
        categories.map((cat) =>
          cat._id === editingCategory._id
            ? {
                ...cat,
                name: formData.name,
                description: formData.description,
              }
            : cat
        )
      );
      setEditingCategory(null);
      setFormData({ name: "", description: ""});
    }
  };

  const handleDeleteCategory = async (id: string) => {
    const { data } = await axios.delete(
      "http://localhost:8080/categories/" + id
    );
    if (data) fetchCategories();
  };

  return (

  )
}