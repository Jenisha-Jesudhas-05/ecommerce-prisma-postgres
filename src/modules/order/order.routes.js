import { Router } from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { createOrder, getMyOrders } from "./order.controller.js";
const router = Router();
router.post("/", protect, createOrder);
router.get("/", protect, getMyOrders);
export default router;
