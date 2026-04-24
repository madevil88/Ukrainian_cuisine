import { prisma } from "./prisma";

export const getUserFromDb = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user from database:", error);
    throw new Error("Failed to fetch user");
  }
};
