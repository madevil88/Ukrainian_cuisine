"use server";

import { prisma } from "@/utils/prisma";
import { Category, Unit } from "@/generated/prisma/enums";
import { ingredientSchema } from "@/schema/zod";
import { ZodError } from "zod";

export const createIngredient = async (formData: FormData) => {
  try {
    const data = {
      name: formData.get("name") as string,
      category: formData.get("category") as Category,
      unit: formData.get("unit") as Unit,
      pricePerUnit: formData.get("pricePerUnit")
        ? Number.parseFloat(formData.get("pricePerUnit") as string)
        : null,
      description: (formData.get("description") as string) || null,
    };

    const validatedData = ingredientSchema.parse(data);

    const ingredient = await prisma.ingredient.create({ data: validatedData });

    return { error: null, ingredient };
  } catch (error) {
    if (error instanceof ZodError) {
      return { error: error.issues.map((e) => e.message).join(", ") };
    }
    console.error("Error creating ingredient:", error);
    return { error: "Error creating ingredient" };
  }
};

export const getIngredients = async () => {
  try {
    const ingredients = await prisma.ingredient.findMany();

    return { success: true, ingredients };
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    return { error: "Error fetching ingredients" };
  }
};

export const deleteIngredient = async (id: string) => {
  try {
    const ingredient = await prisma.ingredient.delete({
      where: { id },
    });

    return { success: true, ingredient };
  } catch (error) {
    console.error("Error deleting ingredient:", error);
    return { error: "Error deleting ingredient" };
  }
};
