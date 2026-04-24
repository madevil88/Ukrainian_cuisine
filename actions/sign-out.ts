"use server";

import { signOut } from "@/auth/auth";

export const signOutFunc = async () => {
  try {
    const result = await signOut({
      redirect: false,
    });
    return result;
  } catch (error) {
    console.error("Error signing out:", error);
    throw new Error("Failed to sign out");
  }
};
