import { Request } from "express";
import { User } from "./User.js";

export type OptionalAuthenticatedRequest = Request & { user?: User };
export type AuthenticatedRequest = Request & { user: User };
