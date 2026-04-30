import { create } from "zustand";
import { Recipe } from "@/types/recipe";
import {
  getRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "@/actions/recipe";

type ActionResult = {
  success: boolean;
  recipe?: Recipe;
  error?: string;
};

type RecipeState = {
  recipes: Recipe[];
  isLoading: boolean;
  error: string | null;
  loadRecipes: () => Promise<void>;
  addRecipe: (formData: FormData) => Promise<ActionResult>;
  updateRecipe: (id: string, formData: FormData) => Promise<ActionResult>;
  removeRecipe: (id: string) => Promise<void>;
};

export const useRecipeStore = create<RecipeState>((set) => ({
  recipes: [],
  isLoading: true,
  error: null,

  loadRecipes: async () => {
    set({ isLoading: true, error: null });
    const result = await getRecipes();
    if (result.error) {
      set({ error: result.error, isLoading: false });
    } else {
      set({ recipes: result.recipes as Recipe[], isLoading: false });
    }
  },

  addRecipe: async (formData: FormData) => {
    const result = await createRecipe(formData);
    if (result.error) {
      return { success: false, error: result.error };
    }
    if (result.recipe) {
      set((state) => ({
        recipes: [...state.recipes, result.recipe as Recipe],
      }));
    }
    return { success: true, recipe: result.recipe as Recipe };
  },

  updateRecipe: async (id: string, formData: FormData) => {
    const result = await updateRecipe(id, formData);
    if (result.error) {
      return { success: false, error: result.error };
    }
    if (result.recipe) {
      set((state) => ({
        recipes: state.recipes.map((r) =>
          r.id === id ? (result.recipe as Recipe) : r
        ),
      }));
    }
    return { success: true, recipe: result.recipe as Recipe };
  },

  removeRecipe: async (id: string) => {
    const previous = useRecipeStore.getState().recipes;
    set((state) => {
      const index = state.recipes.findIndex((r) => r.id === id);
      return {
        recipes: index === -1 ? state.recipes : state.recipes.toSpliced(index, 1),
        error: null,
      };
    });
    const result = await deleteRecipe(id);
    if (result.error) {
      set({ recipes: previous, error: result.error });
    }
  },
}));
