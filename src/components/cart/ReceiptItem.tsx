"use client";
import { useAppSelector } from "@/lib/hooks";
import { CartItem } from "@/lib/definitions";
import { selectItemTotal } from "@/lib/features/cart/cartSlice";

interface ReceiptItemProps {
  item: CartItem;
}

const ReceiptItem = ({ item }: ReceiptItemProps) => {
  const itemTotal = useAppSelector((state) =>
    selectItemTotal(state, item.product_id)
  );

  return (
    <div className="px-3 py-1 text-sm">
      <h3>{item.name}</h3>
      <div className="flex gap-x-1 items-center">
        <p>${item.price}</p>
        <p className="text-white/50 text-sm">x{item.quantity}</p>
        <p className="ml-auto">${itemTotal.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ReceiptItem;
