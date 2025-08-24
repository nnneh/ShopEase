import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  sellerId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference admin user (seller)
  images: [{ type: String }],
  ratings: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number, min: 1, max: 5 },
      comment: String,
    },
  ],
  averageRating: { type: Number, default: 0 },
}, { timestamps: true });

const Product = mongoose.model("Product", ProductSchema);
export default Product;







// import mongoose from "mongoose";
// const { Schema } = mongoose;

// const ProductSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     description: String,
//     price: { type: Number, required: true },
//     stock: { type: Number, required: true },
//     category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
//     images: [{ type: String }],
//     ratings: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "User"  }, rating: {type: Number,  min: 1, max: 5}, comment: String }],
//     averageRating: { type: Number, default: 0 }
//   }, { timestamps: true });
  
//   const Product = mongoose.model("Product", ProductSchema);
//   export default Product;