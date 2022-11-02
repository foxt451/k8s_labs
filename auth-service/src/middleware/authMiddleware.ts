import { NextFunction, Request, Response } from "express";
import { verify } from "../helpers/jwt.js";
import { TrimmedUser } from "../helpers/trimUser.js";
import { AuthenticatedRequest, OptionalAuthenticatedRequest } from "../types/AuthenticatedRequest.js";

export const authMiddleware = async (
  req: OptionalAuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({
      type: "Unauthorized",
      message: "Missing authorization header",
    });
  }
  const token = getBearerTokenFromAuthHeader(authHeader);
  if (!token) {
    return res.status(401).json({
      type: "Unauthorized",
      message: "Missing bearer token",
    });
  }
  try {
    const payload = await verify<TrimmedUser>(token);
    req.user = payload;
  } catch {
    return res.status(401).json({
      type: "Unauthorized",
      message: "Invalid token",
    });
  }
  next();
};

const getBearerTokenFromAuthHeader = (authHeader: string): string => {
  const bearerToken: string | undefined = authHeader.split(" ")[1];
  return bearerToken || "";
};
