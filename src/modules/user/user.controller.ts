import type { Request, Response } from "express";
import prisma from "../../config/prisma.js";

export const getProfile = async (req: any, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  if (!user)
    return res.status(404).json({ message: "User not found" });

  res.json(user);
};

export const getAllUsers = async (_: Request, res: Response) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  res.json(users);
};


export const deleteUser = async (req: any, res: Response) => {
  const { id } = req.params;

  await prisma.user.delete({
    where: { id },
  });

  res.json({ message: "User deleted successfully" });
};