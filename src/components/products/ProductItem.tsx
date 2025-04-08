"use client";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
  addItemToCart,
  selectIsItemInCart,
} from "@/lib/features/cart/cartSlice";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const dispatch = useAppDispatch();

  const isItemInCart = useAppSelector((state) =>
    selectIsItemInCart(state, product.id)
  );

  const handleAddToCart = () => {
    if (!isItemInCart) {
      dispatch(addItemToCart(product));
    }
  };

  return (
    <div className="bg-white/5 rounded-lg w-[150px] h-[150px] p-3 flex flex-col justify-center items-center">
      <h2>{product.name}</h2>
      <p>${product.price.toFixed(2)}</p>
      <button
        onClick={handleAddToCart}
        className={`bg-blue-500 hover:bg-blue-400 text-sm ${
          isItemInCart
            ? `bg-transparent hover:bg-transparent hover:cursor-default px-0`
            : `hover:cursor-pointer px-2 py-0.5 mt-1`
        }`}
      >
        {isItemInCart ? "Item in cart" : "Add to cart"}
      </button>
    </div>
  );
};

export default ProductItem;
