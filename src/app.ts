import express from "express";
import orderRoutes from "./modules/order/order.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import productRoutes from "./modules/product/product.routes.js";
import cartRoutes from "./modules/cart/cart.routes.js";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (_, res) => {
  res.send("E-Commerce API Running 🚀");
});

export default app;
