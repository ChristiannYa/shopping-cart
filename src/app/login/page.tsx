"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { selectUser, selectAuthLoading } from "@/lib/features/auth/authSlice";
import Login from "@/components/auth/Login";

export default function LoginPage() {
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectAuthLoading);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Set mounted to true after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect authenticated users
  useEffect(() => {
    if (mounted && user) {
      router.push("/");
    }
  }, [user, router, mounted]);

  // Show a simple loading state until client-side rendering takes over
  if (!mounted) {
    return null; // Return nothing during SSR to avoid hydration issues
  }

  return (
    <div className="container mx-auto px-4">
      {loading ? (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
          Loading...
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
