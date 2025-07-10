import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cludinary.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";

// App config
const app = express();
const port = process.env.PORT || 5000;

connectDB()
connectCloudinary()

// Middleware
app.use(cors());
app.use(express.json());

// App endpoints
app.use('/api/user', userRoute)
app.use('/api/product', productRoute)
app.use('/api/cart', cartRoute)
app.use('/api/order', orderRoute)

app.get("/", (req, res) => {
    res.send("API Working")
})

app.listen(port, () => {
  console.log(`✅ Server is running on port: ${port}`);
});

app.listen();