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
    .min(6, "Password must be more than 6 characters")
    .max(32, "Password must be less than 32 characters"),
});
