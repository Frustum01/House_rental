import express from "express"
import authMiddleware from "../middleware/auth.middleware.js";
import {addWishlist, getWishlist, removeWishlist} from "../controllers/WishLiist.js"

const router = express.Router()

router.post("/add", authMiddleware, addWishlist);
router.get("/get", authMiddleware, getWishlist);
router.delete("/:propertyId/delete", authMiddleware, removeWishlist);

export default router