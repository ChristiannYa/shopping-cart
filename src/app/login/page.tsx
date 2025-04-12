"use client";

import Login from "@/components/auth/Login";
import { useAuth } from "@/lib/hooks/auth/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <Login />
    </div>
  );
};

export default LoginPage;
