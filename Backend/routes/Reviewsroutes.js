import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { deleteReview, getReviews, submitReview, updateReview } from "../controllers/ReviewController.js";
const router = express.Router();

router.get("/get/:id",getReviews);

router.patch("/update/:id",authMiddleware,updateReview);

router.delete("/delete/:id",authMiddleware,deleteReview);

router.post("/submit",authMiddleware,submitReview);

export default router 