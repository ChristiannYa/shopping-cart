"use client";

import { useState } from "react";
import { useAuth } from "@/lib/hooks/auth/useAuth";

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
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
