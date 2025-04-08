import { useDispatch, useSelector, useStore } from "react-redux";
import type { RootState, AppDispatch, AppStore } from "./store";
import { toggleCartTabStatus } from "./features/cart/cartSlice";

// Use throughout the app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

export const useCartTab = () => {
  const dispatch = useAppDispatch();

  const handleCartTabStatus = () => {
    dispatch(toggleCartTabStatus());
  };

  return { handleCartTabStatus };
};
