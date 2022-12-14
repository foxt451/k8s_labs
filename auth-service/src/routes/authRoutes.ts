import express from "express";
import {
  getProfileInfo,
  logout,
  refreshTokens,
  signIn,
  signUp,
} from "../controllers/authControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { yupBodyMiddleware } from "../middleware/yupBodyMiddleware.js";
import {
  refreshTokensReqSchema,
  signInReqSchema,
  signUpReqSchema,
} from "../schemas/schemas.js";

const router = express.Router();

router.post("/sign-up", yupBodyMiddleware(signUpReqSchema), signUp);
router.post("/sign-in", yupBodyMiddleware(signInReqSchema), signIn);
router.post(
  "/refresh",
  yupBodyMiddleware(refreshTokensReqSchema),
  refreshTokens
);
router.get("/profile/:id", getProfileInfo);
router.post("/logout", authMiddleware, logout);

export { router as authRouter };
