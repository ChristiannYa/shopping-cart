"use client";

import { useSession } from "next-auth/react";

const UserAvatar = () => {
  const { data: session } = useSession();

  // Get the first letter of the user's name, or null if not logged in
  const userInitial = session?.user?.name
    ? session.user.name[0].toUpperCase()
    : null;

  return (
    <div
      className={`rounded-full flex items-center justify-center
      ${userInitial ? "bg-blue-500 w-[36px] h-[36px]" : ""}`}
    >
      {userInitial && <span className="font-medium">{userInitial}</span>}
      {!userInitial && <span className="text-sm">Log in</span>}
    </div>
  );
};

export default UserAvatar;
