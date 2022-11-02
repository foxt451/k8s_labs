import { User } from "./User";

export type SignInPayload = {
  email: string;
  password: string;
};

export type SignInResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};
