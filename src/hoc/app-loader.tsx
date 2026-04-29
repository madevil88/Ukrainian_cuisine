"use client";

import { Session } from "next-auth";
import { useAuthStore } from "@/store/auth.store";
import { useIngredientStore } from "@/store/ingredient.store";
import { useEffect, useRef } from "react";

type AppLoaderProps = {
  children: React.ReactNode;
  session: Session | null;
}

const AppLoader = ({ children, session }: AppLoaderProps) => {
  const { loadIngredients } = useIngredientStore();
  const { isAuth, setAuthState } = useAuthStore();

  const initialized = useRef(false);
  if (!initialized.current) {
    setAuthState(
      session ? "authenticated" : "unauthenticated",
      session,
    );
    initialized.current = true;
  }

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

  return <>{children}</>;
};

export default AppLoader;
