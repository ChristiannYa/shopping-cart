import { NextResponse } from "next/server";
import pool from "@/lib/db";

export const GET = async () => {
  try {
    const result = await pool.query(
      "SELECT product_id as id, name, price, in_stock, quantity FROM products"
    );

    // Convert price to number for each product
    const products = result.rows.map((product) => ({
      ...product,
      price: Number(product.price),
    }));

    return NextResponse.json(products);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
};
