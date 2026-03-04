import type { Request, Response } from "express";
import prisma from "../../config/prisma.js";

export const createProduct = async (req: any, res: Response) => {
  try {
    const product = await prisma.product.create({
      data: {
        ...req.body,
        sellerId: req.user.id, 
      },
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
};


export const getProducts = async (_: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        seller: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};


export const updateProduct = async (req: any, res: Response) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

   
    if (
      req.user.role === "seller" &&
      product.sellerId !== req.user.id
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updated = await prisma.product.update({
      where: { id },
      data: req.body,
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
};


export const deleteProduct = async (req: any, res: Response) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (
      req.user.role === "seller" &&
      product.sellerId !== req.user.id
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await prisma.product.delete({
      where: { id },
    });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};


export const getFeaturedProducts = async (
  _req: Request,
  res: Response
) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        featured: {
          isNot: null,
        },
      },
      include: {
        seller: {
          select: { id: true, name: true },
        },
      },
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching featured products" });
  }
};