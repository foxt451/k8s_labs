import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

export const hash = (data: string): Promise<string> => {
  return bcrypt.hash(data, SALT_ROUNDS);
};
