import {
  object,
  string,
  email,
  enum as zenum,
  number,
  nullable,
  optional,
} from "zod";
import { Category, Unit } from "@/generated/prisma/enums";
import { MIN_PASSWORD_LENGTH } from "@/utils/validators";

const MAX_PASSWORD_LENGTH = 32;

export const ingredientSchema = object({
  name: string().min(1, "Name is required"),
  category: zenum(Object.values(Category) as [Category, ...Category[]]),
  unit: zenum(Object.values(Unit) as [Unit, ...Unit[]]),
  pricePerUnit: optional(nullable(number().positive())),
  description: optional(nullable(string())),
});

export const signInSchema = object({
  email: email({ error: "Invalid email" }),
  password: string({ error: "Password is required" })
    .min(1, "Password is required")
    .min(MIN_PASSWORD_LENGTH, `Password must be at least ${MIN_PASSWORD_LENGTH} characters`)
    .max(MAX_PASSWORD_LENGTH, `Password must be less than ${MAX_PASSWORD_LENGTH} characters`),
});
