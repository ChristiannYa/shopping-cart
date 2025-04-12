"use client";

import ProductItem from "./ProductItem";
import { useEffect, useState } from "react";
import { Product } from "@/lib/definitions";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products", err);
        setError("Failed to load products");
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="mt-20 space-y-5 flex flex-col justify-center items-center">
        <div>Loading products...</div>
        <span className="w-6 h-6 border-2 border-gray-500 border-t-white rounded-full animate-spin"></span>
      </div>
    );
  if (error)
    return (
      <div className="mt-32 flex flex-col justify-center items-center">
        <div>Error loading products: {error}</div>
      </div>
    );

  return (
    <div className="flex flex-wrap justify-center items-center gap-2">
      {products.map((product) => (
        <ProductItem key={product.product_id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
