"use server";

import { signIn } from "@/auth/auth";

export const signInWithCredentials = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const result = await signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
      redirect: false,
    });
    return result;
  } catch (error) {
    console.error("Error signing in:", error);
    throw new Error("Failed to sign in");
  }
};
