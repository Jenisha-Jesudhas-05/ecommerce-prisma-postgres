import type { Request, Response } from "express";
import prisma from "../../config/prisma.js";



export const addToCart = async (req: any, res: Response) => {
  const { productId, quantity } = req.body;

  let cart = await prisma.cart.findUnique({
    where: { userId: req.user.userId },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId: req.user.userId },
    });
  }

  const item = await prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId,
      quantity,
    },
  });

  res.json(item);
};

export const getCart = async (req: any, res: Response) => {
  const cart = await prisma.cart.findUnique({
    where: { userId: req.user.userId },
    include: { items: true },
  });

  res.json(cart);
};