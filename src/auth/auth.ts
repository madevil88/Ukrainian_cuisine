import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "@/schema/zod";
import { getUserFromDb } from "@/utils/user";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/utils/prisma";
import bcryptjs from "bcryptjs";

const SESSION_MAX_AGE_SECONDS = 60 * 60;

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } =
            await signInSchema.parseAsync(credentials);

          const user = await getUserFromDb(email);
          if (!user?.password) return null;

          const isPasswordValid = await bcryptjs.compare(
            password,
            user.password,
          );
          if (!isPasswordValid) return null;

          return { id: user.id, email: user.email };
        } catch {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: SESSION_MAX_AGE_SECONDS,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
  },
});
