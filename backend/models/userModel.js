import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fname: { type: String, required: true },
        lname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        // isAdmin: { type: Boolean, required: true, default: false },
        cartData: {type: Object, default: {}},
        shippingDetails: {type: Object, default: {}},
        billingDetails: {type: Object, default: {}},
    }, {minimize: false}
);

const userModel = mongoose.model.user || mongoose.model("User", userSchema);
export default userModel;