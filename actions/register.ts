"use server";

import { RegisterUserParams } from "@/types/form-data";
import { saultAndHashPassword } from "@/utils/password";
import { prisma } from "@/utils/prisma";

export const registerUser = async (formData: RegisterUserParams) => {
  if (formData.password !== formData.confirmPassword) {
    throw new Error("Passwords do not match");
  }

  if (formData.password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: formData.email },
    });

    if (existingUser) {
      throw new Error("Email is already registered");
    }

    const pwHash = await saultAndHashPassword(formData.password);
    const user = await prisma.user.create({
      data: {
        email: formData.email,
        password: pwHash,
      },
    });
    console.log("User registered:", user);

    return user;
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error("Failed to register user");
  }
};