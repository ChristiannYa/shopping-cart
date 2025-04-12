"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { formatDate } from "@/lib/utils/formatDate";
import { useAuth } from "@/lib/hooks/auth/useAuth";
import LogoutButton from "@/components/profile/LogoutButton";

function ProfileContent() {
  const { user } = useAuth();

  return (
    <div className="p-4">
      <div className="mt-8 mx-auto w-fit flex flex-col justify-center items-center">
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

        <div className="mt-3">
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
