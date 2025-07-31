import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";
import orderModel from "../models/orderModel.js";

// Controller Function for Placing Order
const placeOrder = async (req, res) => {
  try {
    // Destructure all necessary data from the request body
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
    // Stripe integration logic would go here
  } catch (error) {
    console.error("Error with Stripe payment:", error);
    res.status(500).json({ success: false, message: "Stripe payment failed" });
  }
};

// Controller Function for Verifiying Payment Using Stripe
const verifyPayment = async (req, res) => {
  try {
    // Payment verification logic would go here
  } catch (error) {
    console.error("Error verifying payment:", error);
    res
      .status(500)
      .json({ success: false, message: "Payment verification failed" });
  }
};

// Controller Function for All Orders for Admin
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
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
      .json({ success: false, message: "Failed to update order status" });
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
      .json({ success: false, message: "Failed to fetch user orders" });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  verifyPayment,
  allOrders,
  updateOrderStatus,
  userOrders,
};
