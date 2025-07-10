import userModel from "../models/userModel.js";
import Product from "../models/productModel.js";

// Helper function to calculate the total bill from the cartData object
const calculateBill = (cartData) => {
    let totalBill = 0;
    // Iterate over the values (the item objects) directly
    for (const cartItemId in cartData) {
        if (cartData.hasOwnProperty(cartItemId)) {
            const itemDetails = cartData[cartItemId];
            // Ensure price and quantity are numbers before calculation
            totalBill += (Number(itemDetails.price) || 0) * (Number(itemDetails.quantity) || 0);
        }
    }
    return totalBill;
};

// Controller Function for Adding Product to Cart
const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity, color } = req.body;

        if (!userId || !productId || !quantity || !color) {
            return res.status(400).json({ message: "Missing required fields: userId, productId, quantity, color." });
        }

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        let cartData = userData.cartData || {}; // Initialize if null or undefined

        const cartItemId = `${productId}_${color}`;

        if (cartData[cartItemId]) {
            cartData[cartItemId].quantity = Number(cartData[cartItemId].quantity) + Number(quantity);
        } else {
            cartData[cartItemId] = {
                productId: productId,
                name: product.name,
                price: Number(product.price),
                quantity: Number(quantity),
                color: color,
                image: product.image
            };
        }

        userData.cartData = cartData;
        userData.markModified('cartData');

        userData.bill = calculateBill(cartData); // Update the total bill
        await userData.save();

        res.status(200).json({ message: "Product added to cart successfully", cartData: userData.cartData, bill: userData.bill });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Controller Function for Updating Product Quantity and Color in Cart
const updateCart = async (req, res) => {
    try {
        const { userId, productId, color, quantity } = req.body;

        if (!userId || !productId || !color || quantity === undefined) {
            return res.status(400).json({ message: "Missing required fields: userId, productId, color, quantity." });
        }

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        let cartData = userData.cartData || {};
        const cartItemId = `${productId}_${color}`;

        if (cartData[cartItemId]) {
            if (Number(quantity) <= 0) { 
                delete cartData[cartItemId];
            } else {
                cartData[cartItemId].quantity = Number(quantity);
            }

            userData.cartData = cartData; // Assign back the modified object
            userData.markModified('cartData'); // Mark the mixed type field as modified

            userData.bill = calculateBill(cartData); // Recalculate bill
            await userData.save();

            res.status(200).json({ message: "Cart updated successfully", cartData: userData.cartData, bill: userData.bill });
        } else {
            res.status(404).json({ message: "Product not found in cart with specified color." });
        }
    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Controller Function for Deleting a Specific Product from Cart
const deleteCartItem = async (req, res) => {
    try {
        const { userId, productId, color } = req.body;

        if (!userId || !productId || !color) {
            return res.status(400).json({ message: "Missing required fields: userId, productId, color." });
        }

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        let cartData = userData.cartData || {};
        const cartItemId = `${productId}_${color}`;

        if (cartData[cartItemId]) {
            delete cartData[cartItemId]; // Remove the item
            userData.cartData = cartData;
            userData.markModified('cartData');

            userData.bill = calculateBill(cartData);
            await userData.save();

            res.status(200).json({ message: "Product removed from cart successfully", cartData: userData.cartData, bill: userData.bill });
        } else {
            res.status(404).json({ message: "Product not found in cart." });
        }
    } catch (error) {
        console.error("Error deleting cart item:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Controller Function for Emptying the Entire Cart
const emptyCart = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required." });
        }

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        userData.cartData = {}; // Set cartData to an empty object
        userData.markModified('cartData'); // Mark as modified
        userData.bill = 0; // Reset bill to 0

        await userData.save();

        res.status(200).json({ message: "Cart emptied successfully", cartData: {}, bill: 0 });
    } catch (error) {
        console.error("Error emptying cart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// Controller Function for Getting User Cart
const getCart = async (req, res) => {
    try {
        const userId = req.query.userId || req.body.userId;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required." });
        }

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        const cartData = userData.cartData || {};
        const bill = userData.bill || 0;

        res.status(200).json({ cartData: cartData, bill: bill });
    } catch (error) {
        console.error("Error getting cart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export { addToCart, updateCart, getCart, deleteCartItem, emptyCart };
