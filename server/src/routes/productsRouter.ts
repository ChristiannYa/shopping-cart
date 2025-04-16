import express from "express";
import * as ProductsController from "../controllers/productsController";

const router = express.Router();

router.get("/", ProductsController.getAllProducts);

export default router;
