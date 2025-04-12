import pool from "../config/db";
import { Product } from "../../../src/lib/definitions";
import { formatProduct } from "../utils/dataFormatter";

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const result = await pool.query("SELECT * FROM products");
    return result.rows.map(formatProduct);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
