"use client";

import { Product } from "@/lib/definitions";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
  addItemToCart,
  selectIsItemInCart,
} from "@/lib/features/cart/cartSlice";

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const dispatch = useAppDispatch();

  const isItemInCart = useAppSelector((state) =>
    selectIsItemInCart(state, product.product_id)
  );

  const handleAddToCart = () => {
    if (!isItemInCart) {
      dispatch(addItemToCart(product));
    }
  };

  return (
    <div className="bg-white/5 rounded-lg w-[170px] h-[160px] grid grid-rows-[2fr_1fr]">
      <div className="flex flex-col items-center justify-center">
        <h2>{product.name}</h2>
        <p>🏷️ ${product.price.toFixed(2)}</p>
      </div>
      <div className="flex justify-center items-start">
        {!product.in_stock && (
          <p className="text-sm text-white/50 px-2 py-0.5">Out of stock</p>
        )}
        {product.in_stock && (
          <button
            onClick={handleAddToCart}
            className={`bg-blue-500 hover:bg-blue-400 text-sm px-2 py-0.5 ${
              isItemInCart
                ? `bg-transparent hover:bg-transparent hover:cursor-default`
                : `hover:cursor-pointer`
            }`}
          >
            {isItemInCart ? "✓ In Cart" : "Add to cart"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
