import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
    },
    itemCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
  }
);

// Add index for faster name searches
CategorySchema.index({ name: 1 });

const Category = mongoose.model("Category", CategorySchema);
export default Category;


// import mongoose from "mongoose";
// const { Schema } = mongoose;

// const CategorySchema = new mongoose.Schema({
//    name: { type: String, 
//            required: true, 
//            unique: true },
//     description: {
//       type: String,
//     },
//   } , { timestamps: true });

  
//   const Category = mongoose.model("Category", CategorySchema);
//  export default Category;