import express from "express";
import {
  addProduct,
  singleProduct,
  displayProduct, // This is the controller with search functionality
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRoute = express.Router();

productRoute.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  addProduct
);

productRoute.post("/single", singleProduct);

// ---
// Search Functionality
productRoute.get("/display", displayProduct); // This route now handles search queries
// ---

productRoute.put(
  "/update",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  updateProduct
);

productRoute.delete("/delete", adminAuth, deleteProduct); // Ensure adminAuth is before deleteProduct

export default productRoute;