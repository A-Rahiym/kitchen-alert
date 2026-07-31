import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import { AppError } from "./errorHandler";

/**
 * validate — Parse and validate the request's body/query/params against a
 * Zod schema. On success the parsed value replaces the original request data;
 * on failure throws 400 VALIDATION_ERROR with the Zod issue details.
 *
 * @param schema The Zod schema to validate against.
 * @param source Which part of the request to validate (defaults to body).
 */
export function validate(schema: ZodSchema, source: "body" | "query" | "params" = "body") {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const data = schema.parse(req[source]);
      req[source] = data;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        throw new AppError(400, "VALIDATION_ERROR", "Request validation failed", err.errors);
      }
      throw err;
    }
  };
}
