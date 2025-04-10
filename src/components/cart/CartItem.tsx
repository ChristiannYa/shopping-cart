"use client";

import { useAppDispatch } from "@/lib/hooks";
import { CartItem as Item } from "@/lib/definitions";
import {
  incrementQuantity,
  decrementQuantity,
  removeItemFromCart,
} from "@/lib/features/cart/cartSlice";

interface ItemProps {
  item: Item;
}

const CartItem = ({ item }: ItemProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="w-full p-2">
      <div className="bg-black/8 px-2 py-1 flex justify-between items-center max-sm:flex-col max-sm:items-start">
        <div>
          <div className="flex gap-x-1 items-center">
            <h3>{item.name}</h3>
            <p className="text-sm text-white/65">x{item.quantity}</p>
          </div>
          <p className="text-sm">${item.price.toFixed(2)}</p>
        </div>

        <div className="flex items-center gap-x-2 max-md:mt-1">
          <button
            className="group bg-white/80 hover:bg-red-500 rounded-full w-[20px] h-[20px] flex justify-center items-center"
            onClick={() => dispatch(decrementQuantity(item.product_id))}
          >
            <span className="text-red-500 group-hover:text-white/80">-</span>
          </button>
          <button
            className="group bg-white/80 hover:bg-green-500 rounded-full w-[20px] h-[20px] flex justify-center items-center"
            onClick={() => dispatch(incrementQuantity(item.product_id))}
          >
            <span className="text-green-500 group-hover:text-white/80">+</span>
          </button>
          <button
            onClick={() => dispatch(removeItemFromCart(item.product_id))}
            className="text-sm px-2 py-0.5 ml-2 hover:cursor-pointer hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
