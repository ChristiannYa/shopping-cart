import { useAppSelector } from "@/lib/hooks";
import { selectCartTotal } from "@/lib/features/cart/cartSlice";

const CartTotal = () => {
  const cartTotal = useAppSelector(selectCartTotal);

  return <div>Total: ${cartTotal.toFixed(2)}</div>;
};

export default CartTotal;
