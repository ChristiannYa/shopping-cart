"use client";
import { useAppSelector } from "@/lib/hooks";
import { selectCartItems } from "@/lib/features/cart/cartSlice";
import CartTotal from "./CartTotal";
import ReceiptItem from "./ReceiptItem";

const Receipt = () => {
  const cartItems = useAppSelector(selectCartItems);

  return (
    <aside className="bg-black rounded-lg w-[500px] h-auto mx-auto p-4 z-10 fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <h2 className="font-semibold text-xl text-center mb-4">Receipt</h2>
      <div>
        {cartItems.map((item, index) => (
          <div key={item.product_id}>
            <ReceiptItem item={item} />
            {/* Render hr if this is not the last item */}
            {index < cartItems.length - 1 && (
              <hr className="w-[96%] my-0.5 mx-auto border-neutral-700" />
            )}
          </div>
        ))}
      </div>
      <div className="text-sm flex justify-end mt-3 mr-3">
        <CartTotal />
      </div>
    </aside>
  );
};

export default Receipt;
