export type RefreshTokenPayload = {
  userId: string;
  refreshToken: string;
};

export type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};
