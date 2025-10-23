import Food from "../models/foodModel.js";
import { cloudinary } from "../config/cloudinaryConfig.js";

// Add new food
export const addFood = async (req, res) => {
  try {
    console.log("🟢 Received add request");
    console.log("Body:", req.body);
    console.log("File:", req.file);

    if (!req.file) {
      console.log("❌ No image uploaded");
      return res.status(400).json({ message: "No image uploaded" });
    }

    const food = new Food({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      image: req.file.path,
      public_id: req.file.filename,
    });

    await food.save();
    console.log("✅ Food saved:", food);

    res.status(201).json({ success: true, food });
  } catch (err) {
    console.error("❌ Backend error:", err);
    res.status(500).json({ success: false, message: err.message });
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

    console.log("Deleting food:", food.name, "with public_id:", food.public_id);

    if (food.public_id) {
      const result = await cloudinary.uploader.destroy(food.public_id);
      console.log("Cloudinary deletion result:", result);
    }

    await Food.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food removed successfully" });
  } catch (error) {
    console.error("Backend removeFood error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

