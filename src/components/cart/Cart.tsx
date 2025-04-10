"use client";

import { useAppDispatch, useAppSelector, useCartTab } from "@/lib/hooks";
import {
  selectCartItems,
  clearCart,
  selectCartTabStatus,
} from "@/lib/features/cart/cartSlice";
import CartItem from "./CartItem";
import CartTotal from "./CartTotal";

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const statusTab = useAppSelector(selectCartTabStatus);
  const { handleCartTabStatus } = useCartTab();

  return (
    <div
      className={`bg-gray-700 transform transition-transform duration-500 w-80 md:w-96 h-full p-2 grid grid-rows-[60px_1fr_60px] fixed top-0 right-0 ${
        statusTab === false ? "translate-x-full" : ""
      }`}
    >
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl text-center">Your Cart</h2>
      </div>

      <div>
        {cartItems.length === 0 ? (
          <p className="text-center">Your Cart is empty</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <CartItem key={item.product_id} item={item} />
            ))}
            <hr className="my-2 text-white/20" />
            <div className="px-3">
              <CartTotal />
            </div>
            <div className="mr-3 text-end">
              <button
                onClick={() => dispatch(clearCart())}
                className="text-xs hover:cursor-pointer hover:underline"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="w-full flex gap-x-2">
        <button
          onClick={handleCartTabStatus}
          className="bg-neutral-900 hover:bg-black hover:cursor-pointer w-full py-2"
        >
          Close
        </button>
        <button className="bg-blue-500 hover:bg-blue-600 hover:cursor-pointer w-full py-2">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
