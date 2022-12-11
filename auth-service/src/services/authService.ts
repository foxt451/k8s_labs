import { UserAccount, RefreshToken, Prisma } from "@prisma/client";
import prisma from "../data/prisma.js";
import { compareHash } from "../helpers/compareHash.js";
import { hash } from "../helpers/hash.js";
import { TrimmedUser, trimUser } from "../helpers/trimUser.js";
import { GetProfileInfoPayload } from "../types/GetProfileInfoPayload.js";
import { RefreshTokenPayload } from "../types/RefreshTokenPayload.js";
import { SignInPayload } from "../types/SignInPayload.js";
import { SignUpPayload } from "../types/SignUpPayload.js";

class AuthService {
  async signUp(signupPayload: SignUpPayload): Promise<TrimmedUser> {
    const user = await prisma.userAccount.create({
      data: {
        email: signupPayload.email,
        passwordHash: await hash(signupPayload.password),
      },
    });
    return trimUser(user);
  }

  async signIn(signInPayload: SignInPayload): Promise<TrimmedUser | null> {
    const user = await prisma.userAccount.findFirst({
      where: {
        email: signInPayload.email,
      },
    });
    if (!user) {
      return null;
    }
    if (!(await compareHash(signInPayload.password, user.passwordHash))) {
      return null;
    }
    return trimUser(user);
  }

  async getProfile(
    getProfilePayload: GetProfileInfoPayload
  ): Promise<TrimmedUser | null> {
    const user = await prisma.userAccount.findFirst({
      where: {
        id: getProfilePayload.id,
      },
    });
    if (!user) {
      return null;
    }
    return trimUser(user);
  }

  async generateRefreshToken(userId: string): Promise<
    RefreshToken & {
      user: UserAccount;
    }
  > {
    await prisma.refreshToken.deleteMany({
      where: {
        userAccountId: userId,
      },
    });
    const token = await prisma.refreshToken.create({
      data: {
        userAccountId: userId,
      },
      include: {
        user: true,
      },
    });
    return token;
  }

  async refreshToken(payload: RefreshTokenPayload): Promise<
    | (RefreshToken & {
        user: UserAccount;
      })
    | null
  > {
    const oldToken = await prisma.refreshToken.findFirst({
      where: {
        id: payload.refreshToken,
        userAccountId: payload.userId,
      },
      include: {
        user: true,
      },
    });
    if (!oldToken) {
      return null;
    }
    const newToken = await this.generateRefreshToken(payload.userId);
    return newToken;
  }

  async logout(userId: string): Promise<void> {
    await prisma.refreshToken.deleteMany({
      where: {
        userAccountId: userId,
      },
    });
  }
}

export const authService = new AuthService();
