import express from "express";
import {createUser,loginUser,logoutUser,forgotPassword } from "../controllers/UserController.js";

const router = express.Router();
router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/forgotpassword", forgotPassword)

export default router;