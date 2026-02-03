// pages/Orders.jsx
import React, { useEffect, useState } from "react";
import "../assets/order.css"

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await fetch("http://localhost:7000/api/order/all");
    const data = await res.json();
    setOrders(data.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h2>Orders</h2>

      {/* Filters */}
      <div className="filters">
        <input placeholder="Search by Customer Name" />
        <select>
          <option>Status</option>
          <option>Delivered</option>
          <option>Pending</option>
          <option>Processing</option>
        </select>
        <select>
          <option>Method</option>
          <option>Cash</option>
          <option>Online</option>
        </select>
        <button className="download-btn">Download All Orders</button>
      </div>

      {/* Orders Table */}
      <table className="orders-table">
        <thead>
          <tr>
            <th>INVOICE NO</th>
            <th>ORDER TIME</th>
            <th>CUSTOMER NAME</th>
            <th>METHOD</th>
            <th>AMOUNT</th>
            <th>STATUS</th>
            <th>ACTION</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.invoice_number}</td>
              <td>{new Date(order.order_time).toLocaleString()}</td>
              <td>{order.customer_name}</td>
              <td>{order.payment_method}</td>
              <td>${order.amount}</td>
              <td>
                <span className={`status ${order.order_status.toLowerCase()}`}>
                  {order.order_status}
                </span>
              </td>
              <td>
                <select defaultValue={order.order_status}>
                  <option>Placed</option>
                  <option>Processing</option>
                  <option>Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
