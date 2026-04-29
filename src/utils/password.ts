import bcryptjs from "bcryptjs";

export const saultAndHashPassword = async (
  password: string,
): Promise<string> => {
  const saltRounds = 10;
  return await bcryptjs.hash(password, saltRounds);
};
