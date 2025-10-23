import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,      // Cloudinary image URL
  public_id: String,  // Cloudinary public ID
});

export default mongoose.model("Food", foodSchema);
