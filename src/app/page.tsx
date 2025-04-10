"use client";

import { useAppSelector } from "@/lib/hooks";

import { selectCartTabStatus } from "@/lib/features/cart/cartSlice";
import HomeHeader from "@/components/layout/HomeHeader";
import ProductList from "@/components/products/ProductList";
import Cart from "@/components/cart/Cart";
import Receipt from "@/components/cart/Receipt";

export default function Home() {
  const statusTab = useAppSelector(selectCartTabStatus);

  return (
    <>
      <div
        className={`transition-all duration-500 ${
          statusTab
            ? "-translate-x-64 blur-xs pointer-events-none"
            : "blur-none"
        }`}
      >
        <HomeHeader />
        <hr className="text-white/20 mb-8" />
        <ProductList />
      </div>
      <Receipt />
      <Cart />
    </>
  );
}
