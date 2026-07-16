import express from "express";
import upload from "../middleware/multer.middleware.js";
import { uploadProfileImage } from "../controllers/uploadProfileImage.js";
import authMiddleware from "../middleware/auth.middleware.js"
const router = express.Router();
router.patch("/updateprofile",upload.single("image"), authMiddleware,uploadProfileImage);
export default router;