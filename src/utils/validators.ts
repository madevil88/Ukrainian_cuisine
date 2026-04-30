const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MIN_PASSWORD_LENGTH = 6;

export const validateEmail = (value: string): string => {
  if (!value) return "Email is required";
  if (!EMAIL_REGEX.test(value)) return "Invalid email";
  return "";
};

export const validatePassword = (value: string): string => {
  if (!value) return "Password is required";
  if (value.length < MIN_PASSWORD_LENGTH) {
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
  }
  return "";
};
