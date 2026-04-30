"use server";

import { prisma } from "@/utils/prisma";

const ingredientsInclude = {
  ingredients: {
    include: {
      ingredient: true
    }
  }
};

const parseFormData = (formData: FormData) => {
  const name = (formData.get("name") as string) ?? "";
  const description = (formData.get("description") as string) ?? "";
  const imageUrl = ((formData.get("imageUrl") as string) || null);
  const ingredients = Array.from(formData.entries())
    .filter(([key]) => key.startsWith("ingredient_"))
    .map(([key, value]) => ({
      ingredientId: value as string,
      quantity: Number.parseFloat(
        formData.get(`quantity_${key.split("_")[1]}`) as string
      )
    }));
  return { name, description, imageUrl, ingredients };
};

const validateRecipeData = (
  name: string,
  ingredients: { ingredientId: string; quantity: number }[]
) => {
  if (!name) return "Name is required";
  if (ingredients.length === 0) return "At least one ingredient is required";
  if (
    ingredients.some(
      (i) => !i.ingredientId || !Number.isFinite(i.quantity) || i.quantity <= 0
    )
  ) {
    return "All ingredients must be selected with quantity > 0";
  }
  return null;
};

const mapIngredientsToCreate = (
  ingredients: { ingredientId: string; quantity: number }[]
) =>
  ingredients.map(({ ingredientId, quantity }) => ({
    ingredient: { connect: { id: ingredientId } },
    quantity
  }));

export const getRecipes = async () => {
  try {
    const recipes = await prisma.recipe.findMany({
      include: ingredientsInclude
    });

    return { success: true, recipes };
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return { success: false, error: "Error loading recipes" };
  }
}

export const createRecipe = async (formData: FormData) => {
  try {
    const { name, description, imageUrl, ingredients } = parseFormData(formData);

    const validationError = validateRecipeData(name, ingredients);
    if (validationError) {
      return { success: false, error: validationError };
    }

    const recipe = await prisma.recipe.create({
      data: {
        name,
        description,
        imageUrl,
        ingredients: { create: mapIngredientsToCreate(ingredients) }
      },
      include: ingredientsInclude
    });

    return { success: true, recipe };
  } catch (error) {
    console.error("Error creating recipe:", error);
    return { success: false, error: "Error creating recipe" };
  }
}

export const updateRecipe = async (id: string, formData: FormData) => {
  try {
    const { name, description, imageUrl, ingredients } = parseFormData(formData);

    const validationError = validateRecipeData(name, ingredients);
    if (validationError) {
      return { success: false, error: validationError };
    }

    const recipe = await prisma.recipe.update({
      where: { id },
      data: {
        name,
        description,
        imageUrl,
        ingredients: {
          deleteMany: {},
          create: mapIngredientsToCreate(ingredients)
        }
      },
      include: ingredientsInclude
    });

    return { success: true, recipe };
  } catch (error) {
    console.error("Error updating recipe:", error);
    return { success: false, error: "Error updating recipe" };
  }
}

export const deleteRecipe = async (id: string) => {
  try {
    await prisma.recipeIngredient.deleteMany({
      where: { recipeId: id }
    });

    await prisma.recipe.delete({
      where: { id }
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return { success: false, error: "Error deleting recipe" };
  }
}
