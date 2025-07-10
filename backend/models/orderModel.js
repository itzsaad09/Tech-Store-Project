// orderModel.js
import mongoose from "mongoose"; // Corrected typo from moongoose to mongoose

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    shippingCharges: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Order Placed" },
    paymentMethod: { type: String, required: true },
    // Adding cardDetails field to store relevant (non-sensitive) card info
    cardDetails: { 
        type: Object, 
        default: {},
        // It's generally NOT recommended to store full card details (CVV, full number)
        // Store only non-sensitive info if needed, or use a payment gateway to tokenize.
        // For demonstration, we'll include a placeholder for card details.
        // In a real app, this would typically store a payment token or last 4 digits.
    },
    payment: { type: Boolean, required: true, default: false },
    date: { type: Date, default: Date.now },    
});

const orderModel = mongoose.model.order || mongoose.model("Order", orderSchema); // Corrected typo
export default orderModel;