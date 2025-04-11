"use client";

import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import UserAvatar from "./UserAvatar";

const UserMenu = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
        <UserAvatar />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-neutral-800 rounded-sm shadow-lg py-1 px-2 z-10">
          {session ? (
            <>
              <div className="text-sm text-blue-500 font-semibold ml-1">
                {session.user?.name || session.user?.email}
              </div>
              <button
                onClick={handleLogout}
                className="block w-full text-left p-1 text-sm text-white hover:underline"
              >
                Sign out
              </button>
            </>
          ) : (
            <a
              href="/login"
              className="block p-1 text-sm text-white hover:underline"
            >
              Sign in
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
