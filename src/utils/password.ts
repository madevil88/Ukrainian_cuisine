import bcryptjs from "bcryptjs";

const SALT_ROUNDS = 10;

export const saltAndHashPassword = (password: string) =>
  bcryptjs.hash(password, SALT_ROUNDS);
