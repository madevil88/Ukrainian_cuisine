"use server";

import { RegisterUserParams } from "@/types/form-data";
import { saltAndHashPassword } from "@/utils/password";
import { prisma } from "@/utils/prisma";
import { MIN_PASSWORD_LENGTH } from "@/utils/validators";

type RegisterResult =
  | { success: true; userId: string; email: string }
  | { success: false; error: string };

export const registerUser = async (
  formData: RegisterUserParams,
): Promise<RegisterResult> => {
  if (formData.password !== formData.confirmPassword) {
    return { success: false, error: "Passwords do not match" };
  }
  if (formData.password.length < MIN_PASSWORD_LENGTH) {
    return {
      success: false,
      error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`,
    };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: formData.email },
    });
    if (existingUser) {
      return { success: false, error: "Email is already registered" };
    }

    const pwHash = await saltAndHashPassword(formData.password);
    const user = await prisma.user.create({
      data: {
        email: formData.email,
        password: pwHash,
      },
    });

    return { success: true, userId: user.id, email: user.email };
  } catch (error) {
    console.error("Error registering user:", error);
    return { success: false, error: "Failed to register user" };
  }
};
