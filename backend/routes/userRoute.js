import express from "express";
import { registerUser, loginUser, adminLogin, userDisplay, getShippingDetails, addShippingDetails} from "../controllers/userController.js";
import userAuth from "../middleware/userAuth.js";
import adminAuth from "../middleware/adminAuth.js";

const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
userRoute.post("/admin", adminLogin);
userRoute.get("/display", adminAuth ,userDisplay);
userRoute.get("/shipping/:userId", getShippingDetails);
userRoute.post("/addshipping", addShippingDetails);

export default userRoute;