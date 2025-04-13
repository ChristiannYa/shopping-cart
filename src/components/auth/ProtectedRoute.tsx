"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { selectUser, selectAuthLoading } from "@/lib/features/auth/authSlice";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectAuthLoading);
  const router = useRouter();
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  console.log("ProtectedRoute state:", { user, loading, initialCheckDone });

  useEffect(() => {
    // Only redirect after we've given the auth state time to load
    if (!loading && !initialCheckDone) {
      setInitialCheckDone(true);
    }

    // Only redirect if we've done the initial check and there's no user
    if (!loading && initialCheckDone && !user) {
      console.log("Redirecting to login - no user found after initial check");
      router.push("/login");
    }
  }, [user, loading, router, initialCheckDone]);

  // Always show loading until initial check is done
  if (loading || !initialCheckDone) {
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
