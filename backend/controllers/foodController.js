import Food from "../models/foodModel.js";
import { cloudinary } from "../config/cloudinaryConfig.js";

// Add new food
export const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    const food = new Food({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: req.file.path,
      public_id: req.file.filename,
    });

    await food.save();
    res.status(201).json({ success: true, message: "Food added successfully", data: food });
  } catch (error) {
    console.error("Backend addFood error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// List all foods
export const listFood = async (req, res) => {
  try {
    const foods = await Food.find({});
    res.status(200).json({ success: true, data: foods });
  } catch (error) {
    console.error("Backend listFood error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove a food item
export const removeFood = async (req, res) => {
  try {
    const food = await Food.findById(req.body.id);
    if (!food) return res.status(404).json({ success: false, message: "Food not found" });

    if (food.public_id) {
      await cloudinary.uploader.destroy(food.public_id);
    }

    await Food.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food removed successfully" });
  } catch (error) {
    console.error("Backend removeFood error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
