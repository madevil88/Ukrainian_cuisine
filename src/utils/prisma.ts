import { PrismaClient } from "@/generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const accelerateUrl = process.env.DATABASE_URL;
if (!accelerateUrl) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const createPrisma = () => new PrismaClient({ accelerateUrl }).$extends(withAccelerate());

type ExtendedPrismaClient = ReturnType<typeof createPrisma>;

const globalForPrisma = global as unknown as { prisma: ExtendedPrismaClient };

export const prisma = globalForPrisma.prisma ?? createPrisma();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
