"use client";

import { Card, Button } from "@heroui/react";
import { useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRecipeStore } from "@/store/recipe.store";
import { UNIT_ABBREVIATIONS } from "@/constants/select-options";
import { Recipe } from "@/types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
}

const getUnitLabel = (unit: string) => {
  const unitOption = UNIT_ABBREVIATIONS.find((option) => option.value === unit);
  return unitOption ? unitOption.label : unit.toLowerCase();
};

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { removeRecipe } = useRecipeStore();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await removeRecipe(recipe.id);
      } catch (error) {
        console.error("Failed to delete recipe:", error);
      }
    });
  };

  return (
    <Card className="w-full h-120 flex flex-col gap-2">
      <div className="h-31">
        {recipe.imageUrl ? (
          <div className="relative h-full rounded-lg">
            <Image
              src={recipe.imageUrl}
              alt="Image for recipe"
              fill
              priority
              sizes="280px"
              className="object-contain image-zoom"
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No image</span>
          </div>
        )}
      </div>

      <Card.Header className="flex justify-between items-center text-black">
        <h2 className="text-xl font-bold">{recipe.name}</h2>
      </Card.Header>

      <Card.Content className="flex-1 text-black">
        <p className="text-gray-600 overflow-y-auto max-h-12">
          {recipe.description || "No description"}
        </p>
        <h3 className="mt-4 font-semibold">Ingredients:</h3>
        <ul className="list-disc pl-5 overflow-y-auto max-h-24">
          {recipe.ingredients.map((ing) => (
            <li key={ing.id}>
              {ing.ingredient.name}: {ing.quantity}{" "}
              {getUnitLabel(ing.ingredient.unit)}
            </li>
          ))}
        </ul>
      </Card.Content>

      <div className="flex justify-end gap-2 p-4">
        <Link href={`/recipes/${recipe.id}`}>
          <Button variant="ghost">Edit</Button>
        </Link>
        <Button
          variant="danger-soft"
          onPress={handleDelete}
          isDisabled={isPending}
        >
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default RecipeCard;
