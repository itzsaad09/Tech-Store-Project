import express from "express";
import { placeOrder, placeOrderStripe, verifyPayment, allOrders, updateOrderStatus, userOrders, getOrderById } from "../controllers/orderController.js"; // Import getOrderById
import adminAuth from "../middleware/adminAuth.js";
import userAuth from "../middleware/userAuth.js";

const orderRoute = express.Router();

// For Admin
orderRoute.get('/list', adminAuth, allOrders)
orderRoute.post('/update', adminAuth, updateOrderStatus)

// For Payment
orderRoute.post('/place', userAuth, placeOrder)
orderRoute.post('/stripe', userAuth, placeOrderStripe)

// For Verifying Payment
orderRoute.post('/verify', userAuth, verifyPayment)

// For User
orderRoute.get('/userorders/:userId', userAuth, userOrders) 
orderRoute.get('/:orderId', getOrderById);

export default orderRoute;
