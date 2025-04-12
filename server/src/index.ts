import express from "express";
import cors from "cors";
import productsRoutes from "./routes/productsRouter";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/products", productsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
