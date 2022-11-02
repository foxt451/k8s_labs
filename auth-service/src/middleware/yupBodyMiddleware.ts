import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";

export const yupBodyMiddleware =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = await schema.validate(req.body);
      req.body = validated;
      return next();
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ type: err.name, message: err.message });
      } else {
        return res.status(400).json({
          type: "Validation Error",
          message: "Incorrect body payload",
        });
      }
    }
  };
