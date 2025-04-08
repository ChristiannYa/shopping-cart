import { products } from "@/constants/products";
import ProductItem from "./ProductItem";

const ProductList = () => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-2">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
