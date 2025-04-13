import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  selectUser,
  selectAuthLoading,
  selectAuthError,
  selectIsAuthenticated,
  fetchCurrentUser,
  loginUser,
  logoutUser,
  clearError,
} from "@/lib/features/auth/authSlice";

export const useAuth = () => {
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    // Fetch the current user when the hook is first used
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const login = async (email: string, password: string) => {
    try {
      const resultAction = await dispatch(loginUser({ email, password }));
      if (loginUser.fulfilled.match(resultAction)) {
        return true;
      }
      return false;
    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  };

  const logout = async () => {
    try {
      await dispatch(logoutUser());
      router.push("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    clearAuthError,
  };
};
