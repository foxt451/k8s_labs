import yup, { SchemaOf } from "yup";
import { RefreshTokenPayload } from "../types/RefreshTokenPayload.js";
import { SignInPayload } from "../types/SignInPayload.js";
import { SignUpPayload } from "../types/SignUpPayload.js";

export const signUpReqSchema: SchemaOf<SignUpPayload> = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required(),
});

export const signInReqSchema: SchemaOf<SignInPayload> = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const refreshTokensReqSchema: SchemaOf<RefreshTokenPayload> = yup
  .object()
  .shape({
    refreshToken: yup.string().required(),
    userId: yup.string().required(),
  });
