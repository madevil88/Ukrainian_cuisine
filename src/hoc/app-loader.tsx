"use client";

import { Session } from "next-auth";
import { useAuthStore } from "@/store/auth.store";
import { useIngredientStore } from "@/store/ingredient.store";
import { useEffect } from "react";
import { useRecipeStore } from "@/store/recipe.store";

type AppLoaderProps = {
  children: React.ReactNode;
  session: Session | null;
}

const AppLoader = ({ children, session }: AppLoaderProps) => {
  const { loadIngredients } = useIngredientStore();
  const { isAuth, setAuthState } = useAuthStore();
  const { loadRecipes } = useRecipeStore();

  useEffect(() => {
    setAuthState(
      session ? "authenticated" : "unauthenticated",
      session,
    );
  }, [session, setAuthState]);

  useEffect(() => {
    if (isAuth) {
      loadIngredients();
    }
  }, [isAuth, loadIngredients]);

  useEffect(() => {
    loadRecipes();
  }, [loadRecipes]);

  return <>{children}</>;
};

export default AppLoader;
