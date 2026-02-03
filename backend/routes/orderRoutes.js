import express from "express";
import { createOrder ,getAllOrders} from "../controller/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/create", createOrder);
orderRouter.get("/all", getAllOrders);
export default orderRouter;
