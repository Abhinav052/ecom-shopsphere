import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./db";
import authRoutes from "./routes/auth.routes";
import requestRoutes from "./routes/request.routes";
import productRoutes from "./routes/product.routes";
import cors from "cors";
dotenv.config();

const app = express();
const port = 3000;
app.use(express.json(), cors());
app.use(express.urlencoded({ extended: true }));
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
// app.use("/api/request", requestRoutes);
app.get("/api", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
