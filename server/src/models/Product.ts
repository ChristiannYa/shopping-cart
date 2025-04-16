import pool from "../config/db";
import { Product } from "../../../src/lib/definitions";
import { formatProduct } from "../utils/dataFormatter";
import { selectProductsQuery } from "../repositories/productsRepository";

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const result = await pool.query(selectProductsQuery);
    return result.rows.map(formatProduct);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
