import foodModel from "../models/foodModel.js";
import { cloudinary } from "../config/cloudinaryConfig.js";

// Add food
const addFood = async (req, res) => {
  try {
    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: req.file.path, // Cloudinary gives full image URL
      public_id: req.file.filename, // Store Cloudinary public ID
    });

    await food.save();
    res.json({ success: true, message: "Food Added Successfully", data: food });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Adding Food" });
  }
};

// List all food
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Fetching Foods" });
  }
};

// Remove food
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    if (!food) return res.json({ success: false, message: "Food Not Found" });

    if (food.public_id) {
      await cloudinary.uploader.destroy(food.public_id);
    }

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Removing Food" });
  }
};

export { addFood, listFood, removeFood };
