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
    res.status(201).json({ success: true, food });
  } catch (err) {
    console.error("Backend error:", err); // <--- very important
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
