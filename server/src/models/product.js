const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    images: [{ type: String }],
    ratings: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "User"  }, rating: {type: Number,  min: 1, max: 5}, comment: String }],
    averageRating: { type: Number, default: 0 }
  }, { timestamps: true });
  
  const Product = mongoose.model("Product", ProductSchema);
  module.exports = Product;