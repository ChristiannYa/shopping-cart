"use client";

import { useAppSelector, useCartTab } from "@/lib/hooks";
import { selectCartItemsLength } from "@/lib/features/cart/cartSlice";
import UserMenu from "@/app/ui/UserMenu"; // Update the import path if needed
import Image from "next/image";

const HomeHeader = () => {
  const { handleCartTabStatus } = useCartTab();
  const cartItemslength = useAppSelector(selectCartItemsLength);

  return (
    <header
      className="px-4 my-4 mx-auto flex justify-between items-center"
      style={{ width: "min(90%, 1000px)" }}
    >
      <h1 className="text-2xl text-center my-4">Home Page</h1>
      <div className="flex items-center gap-x-2">
        <UserMenu />
        <button
          onClick={handleCartTabStatus}
          className="bg-white/5 hover:bg-white/10 hover:cursor-pointer rounded-full p-3 relative"
        >
          <Image
            aria-hidden
            src="/cart.svg"
            alt="File icon"
            width={19}
            height={19}
          />
          <span className="bg-blue-500 text-xs rounded-full w-[20px] h-[20px] p-2 flex items-center justify-center absolute -top-1.5 -right-1.5">
            {cartItemslength}
          </span>
        </button>
      </div>
    </header>
  );
};

export default HomeHeader;
