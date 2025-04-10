"use client";

import { useProducts } from "@/lib/hooks";
import ProductItem from "./ProductItem";

const ProductList = () => {
  const { products, loading, error } = useProducts();

  if (loading)
    return (
      <div className="mt-32 flex flex-col justify-center items-center">
        <div>Loading products...</div>
      </div>
    );
  if (error) return <div>Error loading products: {error}</div>;

  return (
    <div className="flex flex-wrap justify-center items-center gap-2">
      {products.map((product) => (
        <ProductItem key={product.product_id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
