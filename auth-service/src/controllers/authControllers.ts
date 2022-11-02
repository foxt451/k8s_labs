import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { signAccessToken } from "../helpers/jwt.js";
import { trimUser } from "../helpers/trimUser.js";
import { authService } from "../services/authService.js";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest.js";
import { RefreshTokenPayload } from "../types/RefreshTokenPayload.js";
import { SignInPayload } from "../types/SignInPayload.js";
import { SignUpPayload } from "../types/SignUpPayload.js";

export const signUp = async (
  req: Request<unknown, unknown, SignUpPayload>,
  res: Response
) => {
  try {
    const registeredUser = await authService.signUp(req.body);
    res.json({
      user: registeredUser,
      accessToken: await signAccessToken(registeredUser),
      refreshToken: (await authService.generateRefreshToken(registeredUser.id))
        .id,
    });
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2002"
    ) {
      return res.status(400).json({
        type: "Uniqueness Error",
        message: "User already exists",
      });
    }
    throw e;
  }
};

export const signIn = async (
  req: Request<unknown, unknown, SignInPayload>,
  res: Response
) => {
  const user = await authService.signIn(req.body);
  if (!user) {
    return res.status(401).json({
      type: "Unauthorized",
      message: "Incorrect credentials",
    });
  }
  res.json({
    user,
    accessToken: await signAccessToken(user),
    refreshToken: (await authService.generateRefreshToken(user.id)).id,
  });
};

export const refreshTokens = async (
  req: Request<unknown, unknown, RefreshTokenPayload>,
  res: Response
) => {
  const newRefreshToken = await authService.refreshToken(req.body);
  if (!newRefreshToken) {
    return res.status(401).json({
      type: "Unauthorized",
      message: "Incorrect token",
    });
  }
  res.json({
    accessToken: await signAccessToken(trimUser(newRefreshToken.user)),
    refreshToken: newRefreshToken.id,
  });
};

export const logout = async (
  req: Request,
  res: Response
) => {
  await authService.logout((req as AuthenticatedRequest).user.id);
  res.status(200).send();
};
