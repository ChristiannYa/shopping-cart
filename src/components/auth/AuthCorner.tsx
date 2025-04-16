"use client";

import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
  logoutUser,
  selectIsAuthenticated,
} from "@/lib/features/auth/authSlice";

const AuthCorner = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const handleLogin = () => {
    router.push("/login");
  };

  const handleProfile = () => {
    router.push("/profile");
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    router.push("/");
  };

  return (
    <div className="flex flex-col items-end gap-2">
      {isAuthenticated ? (
        <>
          <button
            onClick={handleProfile}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors shadow-md hover:cursor-pointer w-[72px] py-0.5 flex items-center justify-center"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors shadow-md hover:cursor-pointer w-[72px] py-0.5 flex items-center justify-center"
          >
            Logout
          </button>
        </>
      ) : (
        <button
          onClick={handleLogin}
          className="bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors shadow-md hover:cursor-pointer w-[72px] py-0.5 flex items-center justify-center"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default AuthCorner;
