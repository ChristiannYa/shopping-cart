"use client";

import { useSession } from "next-auth/react";

const UserAvatar = () => {
  const { data: session, status } = useSession();

  const isLoading = status === "loading";

  // Get the first letter of the user's name, or null if not signed in
  const userInitial = session?.user?.name
    ? session.user.name[0].toUpperCase()
    : null;

  return (
    <div
      className={`rounded-full flex items-center justify-center
      ${isLoading ? "bg-gray-700 w-[36px] h-[36px]" : ""}
      ${
        userInitial
          ? "bg-white hover:bg-white/90 text-black w-[36px] h-[36px] hover:cursor-pointer"
          : ""
      }`}
    >
      {isLoading && (
        <span className="w-4 h-4 border-2 border-gray-500 border-t-white rounded-full animate-spin"></span>
      )}
      {!isLoading && userInitial && (
        <span className="font-medium">{userInitial}</span>
      )}
      {!isLoading && !userInitial && (
        <span className="text-white text-sm hover:cursor-pointer p-1">
          Guest
        </span>
      )}
    </div>
  );
};

export default UserAvatar;
