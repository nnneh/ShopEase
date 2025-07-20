const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategorySchema = new mongoose.Schema({
    });
  
  const Category = mongoose.model("Category", CategorySchema);
 export default Category;