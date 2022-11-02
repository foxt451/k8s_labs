import { User } from "./User";

export type SignUpPayload = {
  email: string;
  password: string;
};

export type SignUpResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};
