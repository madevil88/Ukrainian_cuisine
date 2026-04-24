import { object, string, email } from "zod";

export const signInSchema = object({
  email: email({ error: "Invalid email" }),
  password: string({ error: "Password is required" })
    .min(1, "Password is required")
    .min(6, "Password must be more than 6 characters")
    .max(32, "Password must be less than 32 characters"),
});
