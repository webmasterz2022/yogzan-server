require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const {extractPublicId} = require('cloudinary-build-url') 

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

cloudinary.getStorage = (type) => {

  return new CloudinaryStorage({
    cloudinary,
    params: {
      folder: `/${type}/${process.env.NODE_ENV}`,
      image_metadata: true,
      allowedFormats: ["jpeg", "jpg", "png"]
    },
  });
};

cloudinary.deleteCloudPicture = async (path) => {
  try {
    const publicId = extractPublicId(path)
    const resp = await cloudinary.uploader.destroy(publicId)
    console.log(resp)
  } catch (error) {
    console.error(error)
  }
};

module.exports = cloudinary;
