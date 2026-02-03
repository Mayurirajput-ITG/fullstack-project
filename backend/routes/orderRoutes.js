import express from "express";
import { createOrder ,getAllOrders,getDashboardStats} from "../controller/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/create", createOrder);
orderRouter.get("/all", getAllOrders);
orderRouter.get("/dashboard",getDashboardStats)
export default orderRouter;
