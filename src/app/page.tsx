"use client";

import { useAppSelector } from "@/lib/hooks";

import { selectCartTabStatus } from "@/lib/features/cart/cartSlice";
import HomeHeader from "@/components/layout/HomeHeader";
import ProductList from "@/components/products/ProductList";
import AuthCorner from "@/components/auth/AuthCorner";
import Cart from "@/components/cart/Cart";

export default function Home() {
  const statusTab = useAppSelector(selectCartTabStatus);

  return (
    <>
      <div className="mx-auto" style={{ width: "min(90%, 1200px)" }}>
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
          <div className="mt-8 flex justify-end">
            <AuthCorner />
          </div>
        </div>
        <Cart />
      </div>
    </>
  );
}
