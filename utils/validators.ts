export const validateEmail = (value: string): string => {
  if (!value) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email";
  return "";
};

export const validatePassword = (value: string): string => {
  if (!value) return "Password is required";
  if (value.length < 6) return "Password must be at least 6 characters";
  return "";
};
