import express from "express";
import multer from "multer";
import { storage } from "../config/cloudinaryConfig.js";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";

const router = express.Router();
const upload = multer({ storage });

router.post("/add", upload.single("image"), addFood);
router.get("/", listFood);
router.delete("/remove", removeFood);

export default router;
