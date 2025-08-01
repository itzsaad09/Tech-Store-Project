import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";
import orderModel from "../models/orderModel.js";

// Controller Function for Placing Order
const placeOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItemsArray,
      shippingFees,
      finalTotalBill,
      shippingInfo,
      paymentMethod,
      cardDetails,
    } = req.body;

    // Prepare order data
    const orderData = {
      userId: userId,
      items: cartItemsArray,
      amount: finalTotalBill,
      shippingCharges: shippingFees,
      address: shippingInfo,
      status: "Order Placed",
      paymentMethod: paymentMethod,
      payment: paymentMethod === "cash_on_delivery" ? false : true,
    };

    // If credit card is selected, add cardDetails (non-sensitive parts)
    if (paymentMethod === "credit_card") {
      orderData.cardDetails = {
        cardName: cardDetails.cardName,
        // Only store last 4 digits for security and PCI compliance
        cardNumberLast4: cardDetails.cardNumber.slice(-4),
        expiryDate: cardDetails.expiryDate,
        // DO NOT STORE CVV
      };
    }

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Update user's cartData to an empty object after successful order
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res
      .status(200)
      .json({
        success: true,
        message: "Order Placed Successfully",
        orderId: newOrder._id,
      });
  } catch (error) {
    console.error("Error placing order:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Failed to place order",
        error: error.message,
      });
  }
};

// Controller Function for Placing Order USing Stripe
const placeOrderStripe = async (req, res) => {
  try {
    res.status(501).json({ success: false, message: "Stripe integration not yet implemented" });
  } catch (error) {
    console.error("Error with Stripe payment:", error);
    res.status(500).json({ success: false, message: "Stripe payment failed", error: error.message });
  }
};

// Controller Function for Verifiying Payment Using Stripe
const verifyPayment = async (req, res) => {
  try {
    res.status(501).json({ success: false, message: "Payment verification not yet implemented" });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res
      .status(500)
      .json({ success: false, message: "Payment verification failed", error: error.message });
  }
};

// Controller Function for All Orders for Admin
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders", error: error.message });
  }
};

// Controller Function for Updating Order Status for Admin
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Order status updated" });
  } catch (error) {
    console.error("Error updating order status:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update order status", error: error.message });
  }
};

// Controller Function for Getting User Orders
const userOrders = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch user orders", error: error.message });
  }
};

// Controller Function for Getting a Single Order by ID
const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await orderModel.findById(orderId);

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found." });
        }

        res.status(200).json({ success: true, order });
    } catch (error) {
        console.error("Error fetching order by ID:", error);
        res.status(500).json({ success: false, message: "Failed to fetch order details.", error: error.message });
    }
};


export {
  placeOrder,
  placeOrderStripe,
  verifyPayment,
  allOrders,
  updateOrderStatus,
  userOrders,
  getOrderById,
};
