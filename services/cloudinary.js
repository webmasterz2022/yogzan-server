require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

cloudinary.getStorage = () => {

  return new CloudinaryStorage({
    cloudinary,
    params: {
      folder: `/Gallery/${process.env.ENV}`,
      allowedFormats: ["jpeg", "jpg", "png"],
    },
  });
};

module.exports = cloudinary;
