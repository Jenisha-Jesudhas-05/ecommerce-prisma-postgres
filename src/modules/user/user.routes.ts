import { Router } from "express";
import {
  getProfile,
  getAllUsers,
  deleteUser,
} from "./user.controller.js";
import { protect } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";



const router = Router();

// 🔹 Get current user profile
router.get("/me", protect, getProfile);

// 🔹 Get all users (admin only)
router.get("/", protect, authorize(["admin"]), getAllUsers);

// 🔹 Delete user (admin only)
router.delete("/:id", protect, authorize(["admin"]), deleteUser);

export default router;