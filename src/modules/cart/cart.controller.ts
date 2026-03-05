import type { Response } from "express";
import prisma from "../../config/prisma.js";

export const addToCart = async (req: any, res: Response) => {
  try {
    const { productId, quantity } = req.body;

    const userId = req.user.id; // ✅ FIXED HERE

    let cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
      });
    }

    const item = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
    });

    res.status(201).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCart = async (req: any, res: Response) => {
  try {
    const userId = req.user.id; // ✅ FIXED HERE

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true, // optional but recommended
          },
        },
      },
    });

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};