import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Reference to your Product model
    required: true,
  },
  name: { type: String, required: true }, // Denormalized for easier display
  price: { type: Number, required: true }, // Price at the time of adding to cart
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity can not be less than 1.'],
  },
  color: { type: String, required: true },
});

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to your User model
      unique: true, // A user should only have one active cart
      sparse: true, // Allows null for guests (if you decide to use null for guests)
    },
    sessionId: { // For guest users, or if you want to track anonymous carts
      type: String,
      unique: true,
      sparse: true,
    },
    items: [cartItemSchema], // Array of cartItemSchema as sub-documents
    bill: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

// Correctly define and export the Cart model
const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
export default Cart;