"use client";

import { signIn, signOut } from "next-auth/react";

export const signOutAction = async () => {
  await signOut({ callbackUrl: "/" });
};

export const signInAction = async (email: string, password: string) => {
  return await signIn("credentials", {
    email,
    password,
    redirect: false,
    callbackUrl: "/",
  });
};
