"use client";

import { Button, Form, Input, ListBox, ListBoxItem, Select } from "@heroui/react";
import { useState } from "react";
import { CATEGORY_OPTIONS, UNIT_OPTIONS } from "@/constants/select-options";

const IngredientForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: null as string | null,
    unit: null as string | null,
    pricePerUnit: null as number | null,
    description: "",
  });
  const [nameError, setNameError] = useState<string | null>(null);
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [unitError, setUnitError] = useState<string | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    if (formData.pricePerUnit === null || priceError) {
      if (formData.pricePerUnit === null) setPriceError("Price is required");
      return;
    }
    console.log("Form submitted:", formData);
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
    <Form className="w-100 flex flex-col gap-3" onSubmit={handleSubmit}>
      <div className="name w-full">
        <Input
          required
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
            name="category"
            value={formData.category}
            onChange={(key) => {
              setFormData((prev) => ({ ...prev, category: key as string }));
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
            name="unit"
            value={formData.unit}
            onChange={(key) => {
              setFormData((prev) => ({ ...prev, unit: key as string }));
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
              required
              name="pricePerUnit"
              placeholder="Price"
              type="number"
              value={formData.pricePerUnit === null ? "" : formData.pricePerUnit.toString()}
              className="bg-default-100 text-sm"
              onChange={handlePriceChange}
            />
            <span
              className="absolute right-3 text-sm pointer-events-none"
              style={{ top: "50%", transform: "translateY(-50%)" }}
            >
              ₴
            </span>
          </div>
          {priceError && <p className="text-sm text-red-500 mt-1">{priceError}</p>}
        </div>
      </div>
      <Input
        name="description"
        placeholder="Enter description (optional)"
        type="text"
        value={formData.description}
        className="bg-default-100 text-sm"
        onChange={handleDescriptionChange}
      />
      <div className="flex w-full items-center justify-end">
        <Button variant="primary" type="submit">
          Add ingredient
        </Button>
      </div>
    </Form>
  );
};

export default IngredientForm;
