"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { formatDate } from "@/lib/utils/formatDate";
import { useAppSelector } from "@/lib/hooks";
import { selectUser } from "@/lib/features/auth/authSlice";
import LogoutButton from "@/components/profile/LogoutButton";
import GoHomeButton from "@/components/navigation/GoHomeButton";

function ProfileContent() {
  const user = useAppSelector(selectUser);

  return (
    <div className="p-8">
      <div className="flex flex-col justify-center items-start">
        <h1 className="text-2xl font-bold mb-4">User Profile</h1>
        {user && (
          <div className="bg-white/10 p-4 rounded-lg shadow-md">
            <p className="text-white/70">
              <span className="font-medium text-white">Name</span>: {user.name}
            </p>
            <p className="text-white/70">
              <span className="font-medium text-white">Email</span>:{" "}
              {user.email}
            </p>
            <p className="text-white/70">
              <span className="font-medium text-white">Account created</span>:{" "}
              {formatDate(user.created_at)}
            </p>
          </div>
        )}

        <div className="mt-4">
          <GoHomeButton />
        </div>

        <div className="mt-4">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
