import express from 'express'
import authMiddeleware from '../middleware/auth.js'
import { listOrders, placeOder, updateStatus, userOders, verifyOrder } from '../controllers/ordercontroller.js'

const orderRouter = express.Router();

orderRouter.post("/place",authMiddeleware,placeOder)
orderRouter.post("/verify",verifyOrder)
orderRouter.post("/userorders",authMiddeleware,userOders)
orderRouter.get("/list",listOrders)
orderRouter.post("/status",updateStatus)
export default orderRouter;