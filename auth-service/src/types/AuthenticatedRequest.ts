import { Request } from "express";
import { TrimmedUser } from "../helpers/trimUser.js";

export type OptionalAuthenticatedRequest = Request & { user?: TrimmedUser };
export type AuthenticatedRequest = Request & { user: TrimmedUser };
