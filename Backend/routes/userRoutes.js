import express from "express";
import {createUser,loginUser,logoutUser,forgotPassword, genrateAccess, getprofile} from "../controllers/UserController.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { getAllCategories, getAllAmenities } from "../controllers/property/getcatogery..js";

const router = express.Router();
router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/access",genrateAccess)
router.post("/forgotpassword", forgotPassword)
router.get("/me",authMiddleware,getprofile)
router.get("/category",authMiddleware,getAllCategories)
router.get("/Aminities",authMiddleware,getAllAmenities)


export default router;