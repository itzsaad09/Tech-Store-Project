import express from "express";
import { registerUser, loginUser, adminLogin, userDisplay} from "../controllers/userController.js";
import userAuth from "../middleware/userAuth.js";

const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
userRoute.post("/admin", adminLogin);
userRoute.get("/display", userDisplay);

export default userRoute;