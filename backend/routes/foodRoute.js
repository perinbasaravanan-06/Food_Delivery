// routes/foodRoute.js
import express from "express";
import multer from "multer";
import { storage } from "../config/cloudinaryConfig.js";
import Food from "../models/foodModel.js";

const router = express.Router();
const upload = multer({ storage });

// Add a new food item
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const food = new Food({
      name: req.body.name,
      price: req.body.price,
      image: req.file.path, // Cloudinary URL
    });

    await food.save();
    res.status(201).json(food);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Get all food items
router.get("/", async (req, res) => {
  try {
    const foods = await Food.find({});
    res.status(200).json(foods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
