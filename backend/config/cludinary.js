import {v2 as cloudinary} from "cloudinary";

const connectCloudinary = async() => {
    try {
        await cloudinary.config({
            cloud_name: process.env.CLDN_NAME,
            api_key: process.env.CLDN_API_KEY,
            api_secret: process.env.CLDN_API_SECRET,
        });
        console.log(`✅ Cloudinary Connected`);
    } catch (error) {
        console.log(`❌ Cloudinary Connection Failed`,error.meesage);
    }
}
export default connectCloudinary