import { useState, useEffect } from "react";
import { User } from "@/lib/definitions";
import { authService } from "@/lib/services/authService";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [shouldFetchUser, setShouldFetchUser] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      if (!shouldFetchUser) {
        setLoading(false);
        return;
      }

      try {
        const userData = await authService.getCurrentUser();
        setUser(userData);
      } catch (err) {
        console.error("Not authenticated", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [shouldFetchUser]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.login(email, password);

      setUser(response.user);
      setShouldFetchUser(true);
      setLoading(false);
      return true;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Failed to login");
        setLoading(false);
      } else {
        setError("An unknown error occurred");
        setLoading(false);
      }
      return false;
    }
  };

  const logout = async () => {
    try {
      setShouldFetchUser(false);

      await authService.logout();
      setUser(null);
      router.push("/login");
    } catch (err) {
      console.error("Logout error", err);
      setError("Failed to logout");
    }
  };

  return { user, loading, error, login, logout };
};
