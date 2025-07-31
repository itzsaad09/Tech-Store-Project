import express from "express";
import { registerUser, loginUser, adminLogin, userDisplay, getShippingDetails, addShippingDetails} from "../controllers/userController.js";
import userAuth from "../middleware/userAuth.js";

const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
userRoute.post("/admin", adminLogin);
userRoute.get("/display", userDisplay);
userRoute.get("/shipping/:userId", getShippingDetails);
userRoute.post("/addshipping", addShippingDetails);

export default userRoute;