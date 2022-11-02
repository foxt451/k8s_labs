import * as jose from "jose";
import { privateKey, publicKey } from "./readKeys.js";
import { TrimmedUser } from "./trimUser.js";
const ACCESS_TOKEN_LIFETIME = process.env.ACCESS_TOKEN_LIFETIME ?? "5m";
const SIGN_ALGO = process.env.SIGH_ALGO || "ES256";

export const signAccessToken = async (user: TrimmedUser): Promise<string> => {
  return sign(user, ACCESS_TOKEN_LIFETIME);
};

export const sign = async <T extends jose.JWTPayload>(
  data: T,
  lifetime: string
): Promise<string> => {
  const jwt = await new jose.SignJWT(data)
    .setProtectedHeader({ alg: SIGN_ALGO })
    .setExpirationTime(lifetime)
    .sign(privateKey);
  return jwt;
};

export const verify = async <T extends jose.JWTPayload>(
  jwt: string
): Promise<T> => {
  const { payload } = await jose.jwtVerify(jwt, publicKey);
  return payload as T;
};
