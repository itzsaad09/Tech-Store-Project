import express from "express";
import { addToCart, getCart, updateCart, deleteCartItem} from "../controllers/cartController.js";
import userAuth from "../middleware/userAuth.js";

const cartRoute = express.Router();

cartRoute.post("/add", userAuth, addToCart);
cartRoute.get("/get", userAuth, getCart);
cartRoute.post("/update", userAuth, updateCart);
cartRoute.post("/delete", userAuth, deleteCartItem);
// cartRoute.post("/empty", userAuth, emptyCart);

export default cartRoute;