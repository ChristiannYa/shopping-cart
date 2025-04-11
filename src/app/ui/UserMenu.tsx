"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { signOutAction } from "../../lib/actions/auth";
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

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
        <UserAvatar />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-4 w-48 bg-neutral-800 rounded-sm shadow-lg p-2 z-10">
          {session ? (
            <>
              <div className="text-sm text-blue-500 font-semibold ml-1">
                {session.user?.name || session.user?.email}
              </div>
              <button
                onClick={() => signOutAction()}
                className="text-left text-sm text-white hover:underline hover:cursor-pointer block w-full ml-1"
              >
                Sign out
              </button>
            </>
          ) : (
            // Ensure clean page state when navigating to the sign in
            // page, hence the a tag instead of Link
            <a
              href="/sign-in"
              className=" text-white text-sm hover:underline hover:cursor-pointer p-1"
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
