"use client";

import ProductItem from "./ProductItem";
import { useProducts } from "@/lib/hooks/products/useProducts";

const ProductList = () => {
  const { products, loading, error } = useProducts();

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
