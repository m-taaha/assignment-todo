// src/middlewares/validate.ts

import { ZodTypeAny } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction) => {
    // 1. Use safeParse to validate the request body
    const result = schema.safeParse(req.body);

    if (result.success) {
      // 2. Success: Overwrite req.body with the cleaned data (removes extra fields)
      req.body = result.data;
      // 3. Move to the next middleware or controller
      return next();
    } else {
      // 4. Failure: Format the Zod errors and send 400 response
      const formattedErrors = result.error.issues.map((issue: any) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return res.status(400).json({
        message: "Validation failed",
        errors: formattedErrors,
      });
    }
  };
