import express from "express"
import authMiddleware from "../middleware/auth.middleware.js";
import { deleteProperty, editMuProperty, hostMyProperty, hostSingle, postProperty } from "../controllers/property/Host.js";
import upload from "../middleware/multer.middleware.js"
import { getProperties, getSingle} from "../controllers/property/getproperties.js";
const router =  express.Router();
router.post("/register/properties",authMiddleware,upload.fields([
    {
        name:"coverImage",
        maxCount:1
    },
    {
        name:"images",
        maxCount:10
    }
]),postProperty);


router.get("/get/properties",authMiddleware,getProperties);

router.get("/get/single/property/:id",getSingle);

router.get("/host/myproperty",authMiddleware,hostMyProperty)

router.get("/host/singleProperty/:id",authMiddleware,hostSingle)

router.put(
    "/host/edit/property/:id",
    authMiddleware,
    upload.fields([
        { name: "coverImage", maxCount: 1 },
        { name: "images", maxCount: 10 }
    ]),
    editMuProperty
);

router.delete("/host/delete/property",authMiddleware,deleteProperty)

export default router