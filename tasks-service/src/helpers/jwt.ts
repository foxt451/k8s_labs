import * as jose from "jose";
import { publicKey } from "./readKeys.js";

export const verify = async <T extends jose.JWTPayload>(
  jwt: string
): Promise<T> => {
  const { payload } = await jose.jwtVerify(jwt, publicKey);
  return payload as T;
};
