import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../config/prisma.js";
export const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });
    if (existingUser)
        return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role: role || "buyer", // 👈 important line
        },
    });
    res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    });
};
export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: { email },
    });
    if (!user)
        return res.status(404).json({ message: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
        return res.status(400).json({ message: "Invalid credentials" });
    const accessToken = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_ACCESS_SECRET, { expiresIn: "1d" });
    res.json({ accessToken });
};
