import { Ingredient } from "@/types/ingredient";
import { create } from "zustand";
import {
  getIngredients,
  createIngredient,
  deleteIngredient,
} from "@/actions/ingredients";

type ActionResult = {
  success: boolean;
  ingredient?: Ingredient;
  error?: string;
};

type IngredientState = {
  ingredients: Ingredient[];
  isLoading: boolean;
  error: string | null;
  loadIngredients: () => Promise<void>;
  addIngredient: (formData: FormData) => Promise<ActionResult>;
  removeIngredient: (id: string) => Promise<void>;
};

export const useIngredientStore = create<IngredientState>((set) => ({
  ingredients: [],
  isLoading: true,
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
    const result = await createIngredient(formData);
    if (result.error) {
      return { success: false, error: result.error };
    }
    if (result.ingredient) {
      set((state) => ({
        ingredients: [...state.ingredients, result.ingredient as Ingredient],
      }));
    }
    return { success: true, ingredient: result.ingredient as Ingredient };
  },

  removeIngredient: async (id: string) => {
    const previous = useIngredientStore.getState().ingredients;
    set((state) => {
      const index = state.ingredients.findIndex((i) => i.id === id);
      return {
        ingredients: index === -1 ? state.ingredients : state.ingredients.toSpliced(index, 1),
        error: null,
      };
    });
    const result = await deleteIngredient(id);
    if (result.error) {
      set({ ingredients: previous, error: result.error });
    }
  },
}));
