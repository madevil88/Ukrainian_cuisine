"use client";

import { Button, Form, Input } from "@heroui/react";
import { useState } from "react";
import { validateEmail, validatePassword } from "@/utils/validators";

interface RegistrationFormProps {
  onClose: () => void;
}

const RegistrationForm = ({ onClose }: RegistrationFormProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setFormData((prev) => ({ ...prev, email: value }));
    setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, password: value }));
    setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, confirmPassword: value }));
    if (!value) setErrors((prev) => ({ ...prev, confirmPassword: "Password confirmation is required" }));
    else if (value !== formData.password) setErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match" }));
    else setErrors((prev) => ({ ...prev, confirmPassword: "" }));
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hasErrors = Object.values(errors).some(Boolean);
    const isEmpty = Object.values(formData).some((v) => !v);
    if (hasErrors || isEmpty) return;
    console.log("Form submitted");
    onClose();
  };

  return (
    <Form className="w-full flex flex-col gap-3 p-1"
      onSubmit={handleSubmit}
    >
      <div className="w-full">
        <Input
          required
          aria-label="Email"
          name="email"
          placeholder="Enter your email"
          type="email"
          value={formData.email}
          className="bg-default-200 text-sm"
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
          className="bg-default-200 text-sm"
          onChange={handlePasswordChange}
        />
        {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
      </div>
      <div className="w-full">
        <Input
          required
          aria-label="Confirm password"
          name="confirmPassword"
          placeholder="Confirm password"
          type="password"
          value={formData.confirmPassword}
          className="bg-default-200 text-sm"
          onChange={handleConfirmPasswordChange}
        />
        {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>}
      </div>
      <div className="flex w-full gap-4 items-center pt-8 justify-end">
        <Button variant="ghost" onPress={onClose}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </div>
    </Form>
  );
};

export default RegistrationForm;
