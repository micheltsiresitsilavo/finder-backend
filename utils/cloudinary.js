import cloudinary from "cloudinary";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Upload
/**
 *Ty dia client cloudinary izay ampidirana media any cloud
 */

export const uploadImage = async (input) => {
  try {
    const res = await cloudinary.v2.uploader.upload(input, {
      width: 500,
      height: 500,
      crop: "fill",
    });
    return res;
  } catch (error) {
    res.status(503).json({ message: "Service unaivalable" });
  }
};

export const uploadPhoto = async (input) => {
  try {
    const res = await cloudinary.v2.uploader.upload(input);
    return res;
  } catch (error) {
    res.status(503).json({ message: "Service Upload Photo unaivalable" });
  }
};

// src={`https://res.cloudinary.com/${process.env.CLOUD_NAME}/v${image.version}/${image.publicId}.${image.format}`}
// CLOUD_NAME: dd5aennsg
