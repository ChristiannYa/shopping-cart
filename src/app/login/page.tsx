"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { selectUser, selectAuthLoading } from "@/lib/features/auth/authSlice";
import Login from "@/components/auth/Login";
import GoHomeButton from "@/components/navigation/GoHomeButton";

export default function LoginPage() {
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectAuthLoading);
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCheckingAuth(false);
      if (user) {
        router.push("/");
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [user, router]);

  if (isCheckingAuth || loading) {
    return (
      <div className="pt-28 flex flex-col justify-center items-center space-y-5">
        <div>Loading...</div>
        <span className="w-6 h-6 border-2 border-gray-500 border-t-white rounded-full animate-spin"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-70px)] mx-auto px-4 space-y-8">
      <Login />
      <GoHomeButton />
    </div>
  );
}
