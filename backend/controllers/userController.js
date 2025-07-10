import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Create Token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

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
}

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
        if(!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid Email" });
        } else if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({ fname: fname, lname: lname, email: email, password: hashedPassword });
        const user = await newUser.save();
        
        const token = createToken(user._id);

        return res.status(200).json({ token , message: "User Registered Successfully" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// Controller Functions for Admin Management
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASS) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const token = jwt.sign( email + password , process.env.JWT_SECRET);
        res.status(200).json({ token: token, message: "Login Successfully" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// Controller Functions for User Display
const userDisplay = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json({ users: users });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export {loginUser, registerUser, adminLogin, userDisplay};