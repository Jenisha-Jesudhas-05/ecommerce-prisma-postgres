import { Router } from "express";
import {
  getProfile,
  getAllUsers,
  deleteUser,
} from "./user.controller.js";
import { protect } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";



const router = Router();

router.get("/me", protect, getProfile);

router.get("/", protect, authorize(["admin"]), getAllUsers);

router.delete("/:id", protect, authorize(["admin"]), deleteUser);

export default router;