import { Router } from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { addToCart, getCart } from "./cart.controller.js";
const router = Router();
router.post("/", protect, addToCart);
router.get("/", protect, getCart);
export default router;
