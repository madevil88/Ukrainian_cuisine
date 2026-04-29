"use client";

import { Button, Form, Input, ListBox, ListBoxItem, Select } from "@heroui/react";
import { useState, useTransition } from "react";
import { CATEGORY_OPTIONS, UNIT_OPTIONS } from "@/constants/select-options";
import { useIngredientStore } from "@/store/ingredient.store";
import { Category, Unit } from "@/generated/prisma/enums";

const initialState = {
  name: "",
  category: null as Category | null,
  unit: null as Unit | null,
  pricePerUnit: null as number | null,
  description: "",
};

const IngredientForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [unitError, setUnitError] = useState<string | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { addIngredient } = useIngredientStore();

  const handleSubmit = async (FormData: FormData) => {
    if (!formData.name) {
      setNameError("Name is required");
      return;
    }
    if (!formData.category) {
      setCategoryError("Category is required");
      return;
    }
    if (!formData.unit) {
      setUnitError("Unit is required");
      return;
    }
    if (priceError) {
      return;
    }

    startTransition(async () => {
      await addIngredient(FormData);
      const storeError = useIngredientStore.getState().error;
      if (storeError) {
        setError(storeError);
      } else {
        setError(null);
        setFormData(initialState);
      }
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const num = Number.parseFloat(raw);
    setFormData((prev) => ({ ...prev, pricePerUnit: raw ? num : null }));
    if (raw && (Number.isNaN(num) || num < 0)) {
      setPriceError("Price must be positive");
    } else {
      setPriceError(null);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, description: e.target.value }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, name: value }));
    setNameError(value ? null : "Name is required");
  };

  return (
    <Form className="w-full flex flex-col gap-3" action={handleSubmit}>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="name w-full">
        <Input
          required
          aria-label="Ingredient name"
          name="name"
          placeholder="Enter ingredient name"
          type="text"
          value={formData.name}
          className="bg-default-100 text-sm w-full"
          onChange={handleNameChange}
        />
        {nameError && <p className="text-sm text-red-500 mt-1">{nameError}</p>}
      </div>
      <div className="flex gap-2 w-full">
        <div className="category flex-1 flex flex-col">
          <Select
            isRequired
            aria-label="Category"
            name="category"
            value={formData.category}
            onChange={(key) => {
              setFormData((prev) => ({ ...prev, category: key as Category }));
              setCategoryError(null);
            }}
            className="w-full"
          >
            <Select.Trigger className="bg-default-100 w-full text-sm">
              <Select.Value className="truncate">
                {({ isPlaceholder, defaultChildren }) =>
                  isPlaceholder ? "Category" : defaultChildren
                }
              </Select.Value>
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {CATEGORY_OPTIONS.map((option) => (
                  <ListBoxItem key={option.value} id={option.value} className="text-black">
                    {option.label}
                  </ListBoxItem>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
          {categoryError && <p className="text-sm text-red-500 mt-1">{categoryError}</p>}
        </div>
        <div className="unit flex-1 flex flex-col">
          <Select
            isRequired
            aria-label="Unit"
            name="unit"
            value={formData.unit}
            onChange={(key) => {
              setFormData((prev) => ({ ...prev, unit: key as Unit }));
              setUnitError(null);
            }}
            className="w-full"
          >
            <Select.Trigger className="bg-default-100 w-full text-sm">
              <Select.Value className="truncate">
                {({ isPlaceholder, defaultChildren }) =>
                  isPlaceholder ? "Unit" : defaultChildren
                }
              </Select.Value>
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {UNIT_OPTIONS.map((option) => (
                  <ListBoxItem key={option.value} id={option.value} className="text-black">
                    {option.label}
                  </ListBoxItem>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
          {unitError && <p className="text-sm text-red-500 mt-1">{unitError}</p>}
        </div>
        <div className="price flex-1">
          <div className="relative w-full">
            <Input
              aria-label="Price per unit"
              name="pricePerUnit"
              placeholder="Price (optional)"
              type="number"
              value={formData.pricePerUnit === null ? "" : formData.pricePerUnit.toString()}
              className="w-full bg-default-100 text-sm"
              onChange={handlePriceChange}
            />
            <span
              className="absolute right-3 text-sm text-field-placeholder pointer-events-none"
              style={{ top: "50%", transform: "translateY(-50%)" }}
            >
              ₴
            </span>
          </div>
          {priceError && <p className="text-sm text-red-500 mt-1">{priceError}</p>}
        </div>
      </div>
      <Input
        aria-label="Description"
        name="description"
        placeholder="Enter description (optional)"
        type="text"
        value={formData.description}
        className="bg-default-100 text-sm"
        onChange={handleDescriptionChange}
      />
      <div className="flex w-full items-center justify-end">
        <Button variant="primary" type="submit" isDisabled={isPending}>
          {isPending ? "Saving..." : "Add ingredient"}
        </Button>
      </div>
    </Form>
  );
};

export default IngredientForm;
