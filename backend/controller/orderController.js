import { createOrderData } from "../services/orderService.js";

export const createOrder = async (req, res) => {
  try {
    const orderData = req.body;

    const order = await createOrderData(orderData);

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    console.error("Create Order Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create order",
    });
  }
};
