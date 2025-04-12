"use client";

import { useAuth } from "@/lib/hooks/auth/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="mt-20 space-y-5 flex flex-col justify-center items-center">
        <div>Loading...</div>
        <span className="w-6 h-6 border-2 border-gray-500 border-t-white rounded-full animate-spin"></span>
      </div>
    );
  }

  return user ? <>{children}</> : null;
};

export default ProtectedRoute;
