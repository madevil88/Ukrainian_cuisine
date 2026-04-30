import { Category, Unit } from "@/generated/prisma/enums";

export type Ingredient = {
  id: string;
  name: string;
  category: Category;
  unit: Unit;
  pricePerUnit: number | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
};
