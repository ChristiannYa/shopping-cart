import { Request, Response } from "express";
import * as ProductModel from "../models/Product";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
