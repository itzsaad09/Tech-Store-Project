import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Create Token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Controller Functions for User Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    const token = createToken(user._id);
    res.status(200).json({ token: token, message: "Login Successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Controller Functions for User Registration
const registerUser = async (req, res) => {
  try {
    const { fname, lname, email, password } = req.body;

    // Check User Exist or Not
    const userExist = await userModel.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ message: "User Already Exist" });
    }

    // Name validation empty or not
    if (!fname || !lname) {
      return res.status(400).json({ message: "Name is required" });
    }

    // Validate Email and Password
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid Email" });
    } else if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      fname: fname,
      lname: lname,
      email: email,
      password: hashedPassword,
    });
    const user = await newUser.save();

    const token = createToken(user._id);

    return res
      .status(200)
      .json({ token, message: "User Registered Successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Controller Functions for Admin Management
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASS
    ) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign(email + password, process.env.JWT_SECRET);
    res.status(200).json({ token: token, message: "Login Successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Controller Functions for User Display
const userDisplay = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({ users: users });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Controller Function to Get User's Shipping Details
const getShippingDetails = async (req, res) => {
  try {
    const { userId } = req.params; // Get userId from URL parameters

    // Find the user by ID and select only the shippingDetails field
    const user = await userModel.findById(userId).select("shippingDetails");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // Send back the shipping details array
    res
      .status(200)
      .json({ success: true, shippingDetails: user.shippingDetails });
  } catch (error) {
    console.error("Error fetching shipping details:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch shipping details.",
      error: error.message,
    });
  }
};

// Controller Function to Add Shipping Details
const addShippingDetails = async (req, res) => {
  try {
    const { userId, shippingInfo } = req.body; // Expect userId and the new shippingInfo object

    if (!userId || !shippingInfo) {
      return res.status(400).json({
        success: false,
        message: "User ID and shipping information are required.",
      });
    }

    // Find the user and push the new shippingInfo into the shippingDetails array
    const user = await userModel.findByIdAndUpdate(
      userId,
      { $push: { shippingDetails: shippingInfo } },
      { new: true, runValidators: true } // 'new: true' returns the updated document, 'runValidators: true' ensures schema validation
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    res.status(200).json({
      success: true,
      message: "Shipping details added successfully.",
      user: user,
    });
  } catch (error) {
    console.error("Error adding shipping details:", error);
    // Mongoose validation errors will have a 'name' property of 'ValidationError'
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ success: false, message: error.message, errors: error.errors });
    }
    return res.status(500).json({
      success: false,
      message: "Failed to add shipping details.",
      error: error.message,
    });
  }
};

export {
  loginUser,
  registerUser,
  adminLogin,
  userDisplay,
  getShippingDetails, // Exported
  addShippingDetails, // Exported
};
