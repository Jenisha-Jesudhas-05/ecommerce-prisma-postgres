import { Router } from "express";
import prisma from "../../config/prisma.js";

import {
  createProduct,
  getProducts,
  getFeaturedProducts,
  updateProduct,
  deleteProduct,
} from "./product.controller.js";

import { protect } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";

const router = Router();

router.get("/featured", getFeaturedProducts);
router.get("/", getProducts);
router.post("/", protect, authorize(["admin", "seller"]), createProduct);
router.put("/:id", protect, authorize(["admin", "seller"]),updateProduct);
router.delete("/:id", protect, authorize(["admin", "seller"]), deleteProduct);

router.post("/:id/feature", protect, authorize(["admin"]), async (req, res) => {
    const { id } = req.params;

    try {
      const featured = await prisma.featured.create({
        data: {
          productId: id,
        },
      });

      res.status(201).json(featured);
    } catch (error) {
      res.status(400).json({
        message: "Already featured or invalid product",
      });
    }
  }
);


router.delete("/:id/feature", protect, authorize(["admin"]), async (req, res) => {
  const { id } = req.params;

    try {
      await prisma.featured.delete({
        where: { productId: id },
      });

      res.json({ message: "Product removed from featured" });
    } catch (error) {
      res.status(400).json({
        message: "Product is not featured",
      });
    }
  }
);

export default router;