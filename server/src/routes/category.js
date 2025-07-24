import { Router } from "express";
import Category from "../models/category.js";
import Product from "../models/product.js"; // Make sure Product model is correctly defined
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const categoryRouter = Router();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(dirname, '../../uploads/categories');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp and random number
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check if file is an image
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Image upload endpoint
categoryRouter.post("/upload", upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }

    const imageUrl = `/uploads/categories/${req.file.filename}`;

    res.json({
      success: true,
      imageUrl: imageUrl,
      message: 'Image uploaded successfully'
    });
  } catch (error) {
    console.error('Upload error:', error);
    if (error instanceof multer.MulterError) {
      // Handle Multer-specific errors
      return res.status(400).json({ success: false, error: error.message });
    }
    res.status(500).json({
      success: false,
      error: 'Upload failed due to server error.'
    });
  }
});

// POST - Create a new category
categoryRouter.post("/categories", async (req, res) => {
  try {
    const { name, description, image } = req.body;

    // Validation
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: 'Name and description are required'
      });
    }

    // Check if category with same name already exists (case-insensitive)
    const existingCategory = await Category.findOne({
      name: { $regex: new RegExp(`^${name}$`, 'i') }
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: 'Category with this name already exists'
      });
    }

    const category = new Category({
      name: name.trim(),
      description: description.trim(),
      image: image || '', // Ensure image is an empty string if not provided
    });

    await category.save();
    res.status(201).json({
      message: "Category created",
      category
    });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({
      message: `Server error: ${error.message}`
    });
  }
});

// GET - Get all categories
categoryRouter.get("/categories", async (req, res) => {
  try {
    const data = await Category.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      message: "Server error",
      error
    });
  }
});

// GET - Get products by category ID
categoryRouter.get("/categories/:categoryId/products", async (req, res) => {
  try {
    const data = await Product.find({ category: req.params.categoryId });
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching category products:', error);
    res.status(500).json({
      message: "Server error",
      error
    });
  }
});

// DELETE - Delete a category
categoryRouter.delete("/categories/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found"
      });
    }

    // Delete associated image file if exists
    if (category.image) {
      // Extract filename from the URL to construct the path
      const filename = path.basename(category.image);
      const imagePath = path.join(uploadsDir, filename);

      if (fs.existsSync(imagePath)) {
        try {
          fs.unlinkSync(imagePath);
          console.log('Deleted image file:', imagePath);
        } catch (err) {
          console.error('Error deleting image file:', err);
          // Log the error but don't prevent category deletion
        }
      }
    }

    await Category.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Category deleted successfully"
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({
      message: "Server error",
      error
    });
  }
});

// PATCH - Update a category
categoryRouter.patch("/categories/:id", async (req, res) => {
  try {
    const { name, description, image } = req.body;

    const categoryToUpdate = await Category.findById(req.params.id);

    if (!categoryToUpdate) {
      return res.status(404).json({
        message: "Category not found"
      });
    }

    // If name is being updated and it's different, check for duplicates
    if (name && name.trim() !== categoryToUpdate.name) {
      const existingCategory = await Category.findOne({
        name: { $regex: new RegExp(`^${name.trim()}$`, 'i') },
        _id: { $ne: req.params.id } // Exclude current category by ID
      });

      if (existingCategory) {
        return res.status(400).json({
          success: false,
          message: 'Category with this name already exists'
        });
      }
    }

    // Store old image path for cleanup if image is being replaced
    const oldImagePath = categoryToUpdate.image;

    // Update fields if provided in the request body
    if (name !== undefined) categoryToUpdate.name = name.trim();
    if (description !== undefined) categoryToUpdate.description = description.trim();
    if (image !== undefined) {
      categoryToUpdate.image = image;

      // Delete old image file if a new one is uploaded and old one exists
      // Ensure oldImagePath is not the same as the new image and it's not empty
      if (oldImagePath && oldImagePath !== image && oldImagePath.trim() !== '') {
        const oldImageFilename = path.basename(oldImagePath);
        const oldImageFilePath = path.join(uploadsDir, oldImageFilename);
        if (fs.existsSync(oldImageFilePath)) {
          try {
            fs.unlinkSync(oldImageFilePath);
            console.log('Deleted old image file:', oldImageFilePath);
          } catch (err) {
            console.error('Error deleting old image file:', err);
            // Log the error but don't prevent category update
          }
        }
      }
    }

    await categoryToUpdate.save();
    res.status(200).json({
      message: "Category updated successfully",
      category: categoryToUpdate,
    });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({
      message: "Server error",
      error
    });
  }
});

export default categoryRouter;