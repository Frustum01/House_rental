import jwt from "jsonwebtoken"
import User from "../models/UserSchema.js";

const adminMiddleware = (req, res, next) => {
    try {

        if (req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Admin only."
            });
        }
        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

export default adminMiddleware