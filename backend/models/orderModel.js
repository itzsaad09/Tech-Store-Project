// orderModel.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  shippingCharges: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, default: "Order Placed" },
  paymentMethod: { type: String, required: true },
  cardDetails: {
    type: Object,
    default: {},
  },
  payment: { type: Boolean, required: true, default: false },
  statusHistory: [
    {
      _id: false,
      status: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

orderSchema.pre("save", function (next) {
  if (this.isNew) {
    // Only run this when the document is first created
    this.statusHistory.push({ status: this.status, timestamp: new Date() });
  }
  next();
});

const orderModel =
  mongoose.models.Order || mongoose.model("Order", orderSchema);
export default orderModel;
