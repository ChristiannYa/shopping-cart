import { Product } from "@/lib/definitions";

const API_URL = "http://localhost:5000/api";

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    const response = await fetch(`${API_URL}/products`);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return response.json();
  },
};
