import prisma from "../../config/prisma.js";
export const getMyOrders = async (req, res) => {
    const userId = req.user.id;
    const orders = await prisma.order.findMany({
        where: { userId },
        include: {
            items: true,
        },
    });
    res.json(orders);
};
export const createOrder = async (req, res) => {
    const cart = await prisma.cart.findUnique({
        where: { userId: req.user.userId },
        include: { items: true },
    });
    if (!cart || cart.items.length === 0)
        return res.status(400).json({ message: "Cart empty" });
    const total = cart.items.reduce((sum, item) => sum + item.quantity * 100, 0);
    const order = await prisma.order.create({
        data: {
            userId: req.user.userId,
            total,
            items: {
                create: cart.items.map((item) => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: 100,
                })),
            },
        },
    });
    res.status(201).json(order);
};
