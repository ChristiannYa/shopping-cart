"use client";

import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
  logoutUser,
  selectUser,
  selectAuthLoading,
  fetchCurrentUser,
} from "@/lib/features/auth/authSlice";
import { storage } from "@/lib/utils/storage";
import { useEffect, useState } from "react";

const AuthCorner = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectAuthLoading);
  const [isStorageChecked, setIsStorageChecked] = useState(false);
  const [isLoggedInFromStorage, setIsLoggedInFromStorage] = useState(false);

  // This effect runs once on component mount to initialize state
  useEffect(() => {
    const checkStorage = () => {
      const isLoggedIn = storage.getFlag("isLoggedIn");
      setIsLoggedInFromStorage(isLoggedIn);
      setIsStorageChecked(true);
    };

    checkStorage();
  }, []);

  // This effect handles cross-tab communication and user data fetching
  useEffect(() => {
    /**
     * Event handler for localStorage changes in other tabs
     *
     * This function responds to authentication changes made in other tabs
     * and updates this tab's state accordingly.
     */
    const handleStorageChange = (event: StorageEvent) => {
      // Only respond to changes in the isLoggedIn flag
      if (event.key === "isLoggedIn") {
        const isLoggedIn = event.newValue === "true";
        setIsLoggedInFromStorage(isLoggedIn);

        // If another tab logged in, fetch the user data
        if (isLoggedIn) {
          dispatch(fetchCurrentUser());
        } else {
          /**
           * If another tab logged out, clear the user from Redux
           *
           * This is a safety measure in case the storage event fires
           * but the Redux state wasn't updated
           */
          if (user) {
            // Force the Redux state to match localStorage
            dispatch(logoutUser());
          }
        }
      }
    };

    // Listener for cross-tab localStorage changes
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch, user]);

  // This effect ensures user data is fetched when isLoggedInFromStorage changes
  useEffect(() => {
    // If localStorage says we're logged in but we don't have user data,
    // fetch the user data
    if (isLoggedInFromStorage && !user && !isLoading) {
      dispatch(fetchCurrentUser());
    }
  }, [isLoggedInFromStorage, user, isLoading, dispatch]);

  const isCheckingAuth =
    !isStorageChecked || isLoading || (isLoggedInFromStorage && !user);

  const handleLogin = () => {
    router.push("/login");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  const handleProfile = () => {
    router.push("/profile");
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    setIsLoggedInFromStorage(false);
    router.push("/");
  };

  if (isCheckingAuth) {
    return (
      <div className="flex flex-col items-end gap-2">
        <div className="animate-pulse bg-gray-500/50 text-transparent rounded-md w-[72px] py-0.5 flex items-center justify-center">
          Button
        </div>
        <div className="animate-pulse bg-gray-500/50 text-transparent rounded-md w-[72px] py-0.5 flex items-center justify-center">
          Button
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-2">
      {user ? (
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
        <>
          <button
            onClick={handleLogin}
            className="hover:bg-green-600 text-white rounded-md transition-colors shadow-md hover:cursor-pointer w-[72px] py-0.5 flex items-center justify-center"
          >
            Login
          </button>
          <button
            onClick={handleRegister}
            className="hover:bg-green-600 text-white rounded-md transition-colors shadow-md hover:cursor-pointer w-[72px] py-0.5 flex items-center justify-center"
          >
            Register
          </button>
        </>
      )}
    </div>
  );
};

export default AuthCorner;
