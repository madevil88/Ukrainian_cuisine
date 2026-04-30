"use client";

import { useAuthStore } from "@/store/auth.store";
import { useIngredientStore } from "@/store/ingredient.store";
import { CATEGORY_OPTIONS, UNIT_OPTIONS } from "@/constants/select-options";
import { Button, Table, TableContent, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";

const IngredientsTable = () => {
  const { ingredients, removeIngredient, isLoading } = useIngredientStore();
  const { isAuth } = useAuthStore();

  const handleDelete = async (id: string) => {
    await removeIngredient(id);
  };

  const getCategoryLabel = (value: string) => {
    const option = CATEGORY_OPTIONS.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  const getUnitLabel = (value: string) => {
    const option = UNIT_OPTIONS.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  if (isLoading || !isAuth) {
    return <p>Loading ingredients...</p>;
  }

  return (
    <Table className="mt-4 w-full">
      <TableContent aria-label="Ingredients list">
        <TableHeader>
          <TableColumn isRowHeader className="text-black">Name</TableColumn>
          <TableColumn className="text-black">Category</TableColumn>
          <TableColumn className="text-black">Unit</TableColumn>
          <TableColumn className="text-black">Price per unit</TableColumn>
          <TableColumn className="text-black">Description</TableColumn>
          <TableColumn className="text-black">Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {ingredients.map((ingredient) => (
            <TableRow key={ingredient.id}>
              <TableCell className="text-black">{ingredient.name}</TableCell>
              <TableCell className="text-black">{getCategoryLabel(ingredient.category)}</TableCell>
              <TableCell className="text-black">{getUnitLabel(ingredient.unit)}</TableCell>
              <TableCell className="text-black">
                {ingredient.pricePerUnit === null
                  ? "-"
                  : `${ingredient.pricePerUnit} ₴`}
              </TableCell>
              <TableCell className="text-black">{ingredient.description || "-"}</TableCell>
              <TableCell>
                <Button
                  variant="danger"
                  size="sm"
                  onPress={() => handleDelete(ingredient.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableContent>
    </Table>
  );
};

export default IngredientsTable;
