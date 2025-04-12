import { useState, useEffect } from "react";
import { Product } from "@/lib/definitions";
import { productService } from "@/lib/services/productService";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts();

        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products", err);
        setError("Failed to load products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};
