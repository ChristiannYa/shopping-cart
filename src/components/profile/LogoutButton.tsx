"use client";

import { useState } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { logoutUser } from "@/lib/features/auth/authSlice";

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await dispatch(logoutUser());
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="px-2 py-0.5 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-red-400 hover:cursor-pointer"
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;
