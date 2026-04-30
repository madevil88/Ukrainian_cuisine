import { Ingredient } from "./ingredient";

export type RecipeIngredient = {
  id: string;
  ingredientId: string;
  quantity: number;
  ingredient: Ingredient;
};

export type Recipe = {
  id: string;
  name: string;
  description: string;
  imageUrl: string | null;
  ingredients: RecipeIngredient[];
};
