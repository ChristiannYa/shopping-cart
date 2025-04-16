import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import productsRoutes from "./routes/productsRouter";
import authRoutes from "./routes/authRouter";
import userRoutes from "./routes/userRouter";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
