import { UserAccount } from "@prisma/client";

export type TrimmedUser = Pick<UserAccount, "email" | "id" | "createdAt">;

export const trimUser = (user: UserAccount): TrimmedUser => {
  return {
    email: user.email,
    createdAt: user.createdAt,
    id: user.id,
  };
};
