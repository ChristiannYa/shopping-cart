"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store";
import { fetchCurrentUser } from "@/lib/features/auth/authSlice";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | undefined>(undefined);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();

    console.log("Store Provider: fetching current user");
    storeRef.current.dispatch(fetchCurrentUser());
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
