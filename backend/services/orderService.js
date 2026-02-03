import Order from "../models/Order.js";

export const createOrderData = async (payload) => {
  try {
    const {
      customer_id,
      customer_name,
      items,
      amount,
      payment_method,
    } = payload;

    const order = await Order.create({
      order_number: `ORD-${Date.now()}`,
      invoice_number: `INV-${Date.now()}`,
      customer_id,
      customer_name,
      items,
      amount,
      payment_method,
      payment_status: "Pending",
      order_status: "Placed",
    });

    return order;
  } catch (error) {
    throw new Error(error.message);
  }
};
// services/orderService.js


export const getAllOrdersService = async (filters = {}) => {
  return await Order.find(filters).sort({ createdAt: -1 });
};
