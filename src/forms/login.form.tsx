"use client";

import { Button, Form, Input } from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { validateEmail } from "@/utils/validators";
import { signInWithCredentials } from "@/actions/sign-in";
import { useAuthStore } from "@/store/auth.store";

interface LoginFormProps {
  onClose: () => void;
}

const LoginForm = ({ onClose }: LoginFormProps) => {
  const router = useRouter();
  const { setAuthState } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setFormData((prev) => ({ ...prev, email: value }));
    setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, password: value }));
    setErrors((prev) => ({ ...prev, password: value ? "" : "Password is required" }));
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hasErrors = Object.values(errors).some(Boolean);
    const isEmpty = Object.values(formData).some((v) => !v);
    if (hasErrors || isEmpty) return;

    try {
      await signInWithCredentials(formData);
      const session = await getSession();
      if (session) {
        setAuthState("authenticated", session);
        router.refresh();
        onClose();
      } else {
        setErrors((prev) => ({ ...prev, password: "Invalid email or password" }));
      }
    } catch (error) {
      console.error("Failed to sign in:", error);
      setErrors((prev) => ({ ...prev, password: "Invalid email or password" }));
    }
  };

  return (
    <Form className="w-full flex flex-col gap-3 p-1"
      onSubmit={handleSubmit}>
      <div className="w-full">
        <Input
          required
          aria-label="Email"
          name="email"
          placeholder="Enter your email"
          type="email"
          value={formData.email}
          className="w-full bg-default-100 text-sm"
          onChange={handleEmailChange}
        />
        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
      </div>
      <div className="w-full">
        <Input
          required
          aria-label="Password"
          name="password"
          placeholder="Enter password"
          type="password"
          value={formData.password}
          className="w-full bg-default-100 text-sm"
          onChange={handlePasswordChange}
        />
        {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
      </div>
      <div className="flex w-full gap-4 items-center pt-8 justify-end">
        <Button variant="ghost" onPress={onClose}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
