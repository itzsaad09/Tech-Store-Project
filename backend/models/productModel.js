import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true},
        image: { type: Array, required: true },
        brand: { type: String, required: true },
        category: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        color: { type: String, required: true },
        countInStock: { type: Number, required: true },
        rating: { type: Number},
        numReviews: { type: Number},
        newArrival: { type: Boolean},
        viralProduct: { type: Boolean},
        date: { type: Date, default: Date.now },
    }
);

const productModel = mongoose.model.product || mongoose.model("Product", productSchema);
export default productModel;