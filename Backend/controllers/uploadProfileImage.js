import mongoose from "mongoose";
import jwt from "jsonwebtoken"

import { uploadToCloudinary } from "../utils/cloudinary.js";

export const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const result = await uploadToCloudinary(req.file.buffer, "rently/profiles");
    req.user.profile_image = result.secure_url;
    await req.user.save();

    return res.status(200).json({
      success: true,
      image: {
        url: result.secure_url,
        publicId: result.public_id,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Image upload failed",
    });
  }
};
