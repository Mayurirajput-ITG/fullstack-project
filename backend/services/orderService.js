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
export const calculateDashboardStats = async () => {
  const orders = await Order.find();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);

  let stats = {
    todayTotal: 0,
    yesterdayTotal: 0,
    thisMonthTotal: 0,
    lastMonthTotal: 0,
    payment: { Cash: 0, Online: 0, Card: 0 },
    totalOrders: orders.length,
    pending: 0,
    processing: 0,
    delivered: 0,
  };

  orders.forEach((order) => {
    const orderDate = new Date(order.createdAt);

    // Totals
    if (orderDate >= today) stats.todayTotal += order.amount;
    if (orderDate >= yesterday && orderDate < today)
      stats.yesterdayTotal += order.amount;
    if (orderDate >= thisMonth) stats.thisMonthTotal += order.amount;
    if (orderDate >= lastMonth && orderDate < thisMonth)
      stats.lastMonthTotal += order.amount;

    // Payment
    if (order.payment_method)
      stats.payment[order.payment_method] =
        (stats.payment[order.payment_method] || 0) + order.amount;

    // Status
    if (order.order_status === "Placed") stats.pending++;
    if (order.order_status === "Processing") stats.processing++;
    if (order.order_status === "Delivered") stats.delivered++;
  });

  return stats;
};