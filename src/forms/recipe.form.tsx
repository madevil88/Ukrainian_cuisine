"use client";

import { useState, useTransition, useRef } from "react";
import { Button, Form, Input, ListBox, ListBoxItem, Select } from "@heroui/react";
import { useIngredientStore } from "@/store/ingredient.store";
import { useRecipeStore } from "@/store/recipe.store";
import { Recipe } from "@/types/recipe";
import { useRouter } from "next/navigation";

type RecipeFormProps = {
  initialRecipe?: Recipe;
};

type IngredientField = {
  id: number;
  ingredientId: string;
  quantity: number | null;
};

const initialState = {
  name: "",
  description: "",
  imageUrl: ""
};

const RecipeForm = ({ initialRecipe }: RecipeFormProps) => {
  const [error, setError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [ingredientsError, setIngredientsError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: initialRecipe?.name ?? initialState.name,
    description: initialRecipe?.description ?? initialState.description,
    imageUrl: initialRecipe?.imageUrl ?? initialState.imageUrl
  });

  const [ingredientFields, setIngredientFields] = useState<IngredientField[]>(
    initialRecipe?.ingredients
      ? initialRecipe.ingredients.map((ing, index) => ({
        id: index,
        ingredientId: ing.ingredientId,
        quantity: ing.quantity
      }))
      : [{ id: 0, ingredientId: "", quantity: null }]
  );

  const nextId = useRef(initialRecipe?.ingredients?.length ?? 1);

  const { ingredients } = useIngredientStore();
  const { addRecipe, updateRecipe } = useRecipeStore();
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleAddIngredientField = () => {
    setIngredientFields((prev) => {
      if (prev.length >= 10) return prev;
      return [...prev, { id: nextId.current++, ingredientId: "", quantity: null }];
    });
  };

  const handleRemoveIngredientField = (id: number) => {
    setIngredientFields((prev) => {
      if (prev.length <= 1) return prev;
      const index = prev.findIndex((field) => field.id === id);
      return index === -1 ? prev : prev.toSpliced(index, 1);
    });
  };

  const handleIngredientChange = (
    id: number,
    field: keyof IngredientField,
    value: string | number | null
  ) => {
    setIngredientFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [field]: value } : f))
    );
    setIngredientsError(null);
  };

  const handleSubmit = async (fd: FormData) => {
    if (!formData.name) {
      setNameError("Name is required");
      return;
    }
    const hasValidIngredients = ingredientFields.every(
      (f) => f.ingredientId && f.quantity !== null && f.quantity > 0
    );
    if (!hasValidIngredients) {
      setIngredientsError("All ingredients must be selected with quantity > 0");
      return;
    }

    startTransition(async () => {
      setError(null);

      const result = initialRecipe
        ? await updateRecipe(initialRecipe.id, fd)
        : await addRecipe(fd);

      if (result.success) {
        setIngredientFields([{ id: 0, ingredientId: "", quantity: null }]);
        router.push("/");
        setFormData(initialState);
      } else {
        setError(result.error ?? "Failed to save recipe");
      }
    });
  };

  return (
    <Form className="w-[70%] flex flex-col gap-3" action={handleSubmit}>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="w-full">
        <Input
          required
          aria-label="Recipe name"
          name="name"
          placeholder="Enter recipe name"
          type="text"
          value={formData.name}
          className="bg-default-100 text-sm w-full"
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
            setNameError(e.target.value ? null : "Name is required");
          }}
        />
        {nameError && <p className="text-sm text-red-500 mt-1">{nameError}</p>}
      </div>

      <Input
        aria-label="Description"
        name="description"
        placeholder="Enter description (optional)"
        type="text"
        value={formData.description}
        className="bg-default-100 text-sm w-full"
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />

      <Input
        aria-label="Image URL"
        name="imageUrl"
        placeholder="Image URL (optional)"
        type="url"
        value={formData.imageUrl}
        className="bg-default-100 text-sm w-full"
        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
      />

      <div className="w-full flex gap-2 flex-col">
        {ingredientFields.map((field, index) => (
          <div key={field.id} className="flex gap-2 items-center">
            <Select
              isRequired
              aria-label="Ingredient"
              name={`ingredient_${index}`}
              value={field.ingredientId || null}
              onChange={(key) =>
                handleIngredientChange(field.id, "ingredientId", key as string)
              }
              className="flex-1"
            >
              <Select.Trigger className="bg-default-100 w-full text-sm">
                <Select.Value className="truncate">
                  {({ isPlaceholder, defaultChildren }) =>
                    isPlaceholder ? "Select ingredient" : defaultChildren
                  }
                </Select.Value>
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {ingredients.map((ingredient) => (
                    <ListBoxItem key={ingredient.id} id={ingredient.id} className="text-black">
                      {ingredient.name}
                    </ListBoxItem>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>

            <Input
              required
              aria-label="Quantity"
              name={`quantity_${index}`}
              placeholder="Quantity"
              type="number"
              value={field.quantity === null ? "" : field.quantity.toString()}
              className="bg-default-100 text-sm w-25"
              onChange={(e) =>
                handleIngredientChange(
                  field.id,
                  "quantity",
                  e.target.value ? Number.parseFloat(e.target.value) : null
                )
              }
            />

            {ingredientFields.length > 1 && (
              <Button
                variant="danger"
                onPress={() => handleRemoveIngredientField(field.id)}
                className="w-12"
              >
                -
              </Button>
            )}
          </div>
        ))}

        {ingredientsError && (
          <p className="text-sm text-red-500">{ingredientsError}</p>
        )}

        {ingredientFields.length < 10 && (
          <Button
            className="bg-white text-blue-500 w-[15%]"
            variant="outline"
            onPress={handleAddIngredientField}
          >
            +
          </Button>
        )}
      </div>

      <div className="flex w-full items-center justify-end">
        <Button variant="primary" type="submit" isDisabled={isPending}>
          {initialRecipe ? "Save changes" : "Add recipe"}
        </Button>
      </div>
    </Form>
  );
};

export default RecipeForm;
