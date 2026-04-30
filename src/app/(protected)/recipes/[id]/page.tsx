"use client";

import RecipeForm from "@/forms/recipe.form";
import { useRecipeStore } from "@/store/recipe.store";
import { useParams } from "next/navigation";

const EditRecipePage = () => {
  const { id } = useParams<{ id: string }>();
  const { recipes, isLoading, error } = useRecipeStore();

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  const recipe = recipes.find((r) => r.id === id);
  if (!recipe) return <p className="text-red-500 text-center">Recipe not found</p>;

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Edit recipe: {recipe.name}</h1>
      <RecipeForm initialRecipe={recipe} />
    </div>
  );
};

export default EditRecipePage;
