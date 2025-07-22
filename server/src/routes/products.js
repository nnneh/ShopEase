import express from "express";
import Product from "../models/product.js";
import Category from "../models/category.js";
import User from "../models/user.js";

const productRouter = express.Router();

// Create Product
productRouter.post("/products", async (req, res) => {
  try {
    const { title, price, description, category, stock, images, ratings } = req.body;

    if (!title || !price || !description || !category || !stock || !images) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const foundCategory = await Category.findOne({ name: category });

    if (!foundCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    const newProduct = new Product({
      title: title,
      price,
      stock,
      category: foundCategory._id,
      description,
      images,
      ratings: ratings || [],
      averageRating: ratings?.length ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length) : 0,
    });

    await newProduct.save();

    res.status(201).json({ message: "Product created successfully", data: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get All Products
productRouter.get("/products", async (req, res) => {
  try {
    let products;
    if (req.query?.sellerId) {
      products = await Product.find({ sellerId: req.query?.sellerId })
        .sort({ createdAt: -1 })
        .populate("sellerId", "name email phoneNumber");
    } else if (req.query.name) {
      const searchRegex = new RegExp(req.query.name, "i");
      products = await Product.find({ title: searchRegex })
        .populate("sellerId")
        .populate("category");
    } else if (req.query.userId) {
      const user = await User.findById(req.query.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const allProducts = await Product.find().populate("sellerId category");
      products = allProducts.filter((item) => {
        return user?.userPreferences?.includes(item.category?._id);
      });
    } else {
      products = await Product.find().populate("sellerId").populate("category");
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Get Product by ID
productRouter.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    // If the ID format is invalid, a 400 Bad Request is more appropriate.
    // If it's another server-side error, 500.
    if (err.name === 'CastError') {
      return res.status(400).json({ error: "Invalid product ID format" });
    }
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// Get Products by Category ID
productRouter.get("/products/category/:categoryId", async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.categoryId }).populate("category");
    if (!products || products.length === 0) {
      return res.status(404).json({ error: "No products found for this category" });
    }
    res.status(200).json(products);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ error: "Invalid category ID format" });
    }
    res.status(500).json({ error: "Failed to fetch products by category" });
  }
});

// Update Product
productRouter.patch("/products/:id", async (req, res) => {
  try {
    const { title, price, description, category, stock, images, ratings } = req.body;

    if (!title && !price && !description && !category && !stock && !images && !ratings) {
      return res.status(400).json({ message: "At least one field is required for update" });
    }

    const updatedProductData = {};

    if (title) updatedProductData.title = title;
    if (price) updatedProductData.price = price;
    if (description) updatedProductData.description = description;
    if (stock) updatedProductData.stock = stock;
    if (images) updatedProductData.images = images;
    if (ratings) {
      updatedProductData.ratings = ratings;
      updatedProductData.averageRating = ratings.length ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length) : 0;
    }

    if (category) {
      const foundCategory = await Category.findOne({ name: category });
      if (!foundCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
      updatedProductData.category = foundCategory._id;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updatedProductData, { new: true }).populate("category");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", data: product });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: "Invalid product ID format" });
    }
    res.status(500).json({ message: "Server error" });
  }
});

// Delete Product
productRouter.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: "Invalid product ID format" });
    }
    res.status(500).json({ message: "Server error" });
  }
});

// Get Product Chips
productRouter.get("/product-chips", async (req, res) => {
  try {
    let productChips;
    if (req.query.categoryId) {
      productChips = await Product.find({ category: req.query.categoryId }).select("_id title category");
      if (productChips.length === 0) {
        return res.status(404).json({ message: "No product chips found for this category." });
      }
    } else {
      productChips = await Product.find().select("_id title category");
    }
    if (productChips.length === 0) {
      return res.status(200).json([]); // Return empty array with 200 if no products overall
    }
    res.status(200).json(productChips);
  } catch (error) {
    if (error.name === 'CastError' && req.query.categoryId) {
      return res.status(400).json({ error: "Invalid category ID format for product chips." });
    }
    res.status(500).json({ message: "Server error fetching product chips." });
  }
});

// Search Products by IDs
productRouter.get("/product-search", async (req, res) => {
  try {
    const productIds = req.query?.productIds?.split(',');
    if (!productIds || productIds.length === 0) {
      return res.status(400).json({ message: "Please provide product IDs for search." });
    }
    const matchedProducts = await Product.find({
      _id: { $in: productIds }
    }).populate('sellerId category');

    if (matchedProducts.length === 0) {
      return res.status(404).json({ message: "No products found for the given IDs." });
    }
    res.status(200).json(matchedProducts);
  } catch (error) {
    // This catch block will primarily handle issues with the IDs themselves if they are malformed,
    // as Mongoose's $in operator handles non-existent IDs gracefully.
    if (error.name === 'CastError') {
      return res.status(400).json({ error: "One or more provided product IDs are in an invalid format." });
    }
    res.status(500).json({ message: "Server error during product search." });
  }
});

export default productRouter;