import mongoose from "mongoose";


/* ---------- Order Item Schema ---------- */
const orderItemSchema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      required: true,
    },
    product_name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    total_price: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

/* ---------- Order Schema ---------- */
const orderSchema = new mongoose.Schema(
  {
    order_number: {
      type: String,
      required: true,
      unique: true,
    },

    invoice_number: {
      type: String,
      required: true,
      unique: true,
    },

    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    customer_name: {
      type: String,
      required: true,
    },

    items: [orderItemSchema],

    amount: {
      type: Number,
      required: true,
    },

    payment_status: {
      type: String,
      enum: ["Paid", "Pending", "Failed"],
      default: "Pending",
    },

    payment_method: {
      type: String,
      enum: ["Online", "Cash on Delivery"],
      required: true,
    },

    order_status: {
      type: String,
      enum: ["Placed", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Placed",
    },

    order_time: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
