import bcrypt from "bcrypt";

export const compareHash = (data: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(data, hash);
};
