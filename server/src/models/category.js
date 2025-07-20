import mongoose from "mongoose";
const { Schema } = mongoose;

const CategorySchema = new mongoose.Schema({
    });
  
  const Category = mongoose.model("Category", CategorySchema);
 export default Category;