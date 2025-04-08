import { useAppSelector } from "@/lib/hooks";
import { selectCartTotal } from "@/lib/features/cart/cartSlice";

const CartTotal = () => {
  const cartTotal = useAppSelector(selectCartTotal);

  return <div>Total: ${cartTotal}</div>;
};

export default CartTotal;
