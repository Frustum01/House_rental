import express from "express"
import authMiddleware from "../middleware/auth.middleware.js";
import { applyBook, myBooking, hostbookingsapproved, hostbookingspendiing, hostApprove, hostReject, tenantCancle} from "../controllers/bookingcontroller.js";
const router = express.Router();

router.post("/",authMiddleware,applyBook);
router.get("/user/my",authMiddleware,myBooking)
router.get("/host/pending/my",authMiddleware,hostbookingspendiing)
router.get("/host/approved/my",authMiddleware,hostbookingsapproved)
router.patch("/host/:id/approve",authMiddleware,hostApprove)
router.patch("/host/:id/reject",authMiddleware,hostReject)
router.patch("/user/:id/cancle",authMiddleware,tenantCancle)

export default router