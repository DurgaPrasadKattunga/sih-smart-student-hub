// cloudinary-test.js
require("dotenv").config(); // Load .env

const cloudinary = require("cloudinary").v2;

// Debug: make sure environment variables are loaded
console.log("Cloud name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API key:", process.env.CLOUDINARY_API_KEY);
console.log("API secret:", process.env.CLOUDINARY_API_SECRET ? "Loaded ✅" : "Not loaded ❌");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Replace with your test image path
const imagePath = "./q1.jpg"; // Make sure q1.jpg is in the same folder

cloudinary.uploader.upload(imagePath, { folder: "test" }, (err, result) => {
  if (err) {
    console.error("Cloudinary error:", err);
  } else {
    console.log("Upload success ✅");
    console.log("Secure URL:", result.secure_url);
  }
});