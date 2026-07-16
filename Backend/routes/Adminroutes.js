    import express from "express"
    import authMiddleware from "../middleware/auth.middleware.js";
    import adminMiddleware from "../middleware/admin.middleware.js";
    import { adminBookings, adminReviews, allUsers, dashboard, hostapprove, hostPendingProperty, hostreject , block, deleteCategory, editCategory, addCategory, addAminities, editAminities, deleteAmenity} from "../controllers/admin.controller.js";

    const router = express.Router();

    router.get("/dashboard",authMiddleware,adminMiddleware,dashboard)
    router.get("/properties/pending",authMiddleware,adminMiddleware,hostPendingProperty)
    router.get("/users",authMiddleware,adminMiddleware,allUsers)
    router.get("/bookings",authMiddleware,adminMiddleware,adminBookings)
    router.get("/review",authMiddleware,adminMiddleware,adminReviews)

    router.patch("/properties/:id/approve",authMiddleware,adminMiddleware,hostapprove)
    router.patch("/properties/:id/reject",authMiddleware,adminMiddleware,hostreject)
    router.patch("/users/:id/toggle",authMiddleware,adminMiddleware,block)
    router.post("/category/add",authMiddleware,adminMiddleware,addCategory)
    router.post("/amenity/add",authMiddleware,adminMiddleware,addAminities)


    router.delete("/category/:id/delete", authMiddleware, adminMiddleware, deleteCategory);
    router.delete("/amenity/:id/delete", authMiddleware, adminMiddleware, deleteAmenity);
    router.patch("/category/:id/edit", authMiddleware, adminMiddleware, editCategory);
    router.patch("/amenity/:id/edit", authMiddleware, adminMiddleware, editAminities);
    export default router