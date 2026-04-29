import { Ingredient } from "@/types/ingredient";
import { create } from "zustand";
import {
  getIngredients,
  createIngredient,
  deleteIngredient,
} from "@/actions/ingredients";

interface IngredientState {
  ingredients: Ingredient[];
  isLoading: boolean;
  error: string | null;
  loadIngredients: () => Promise<void>;
  addIngredient: (formData: FormData) => Promise<void>;
  removeIngredient: (id: string) => Promise<void>;
}

export const useIngredientStore = create<IngredientState>((set) => ({
  ingredients: [],
  isLoading: false,
  error: null,

  loadIngredients: async () => {
    set({ isLoading: true, error: null });
    const result = await getIngredients();
    if (result.error) {
      set({ error: result.error, isLoading: false });
    } else {
      set({
        ingredients: result.ingredients as Ingredient[],
        isLoading: false,
      });
    }
  },

  addIngredient: async (formData: FormData) => {
    set({ error: null });
    const result = await createIngredient(formData);
    if (result.error) {
      set({ error: result.error });
    } else if (result.ingredient) {
      set((state) => ({
        ingredients: [...state.ingredients, result.ingredient as Ingredient],
      }));
    }
  },

  removeIngredient: async (id: string) => {
    const previous = useIngredientStore.getState().ingredients;
    set((state) => ({
      ingredients: state.ingredients.filter((i) => i.id !== id),
      error: null,
    }));
    const result = await deleteIngredient(id);
    if (result.error) {
      set({ ingredients: previous, error: result.error });
    }
  },
}));
