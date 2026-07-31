import { Request, Response, NextFunction } from "express";

/**
 * AppError — Custom error carrying an HTTP status, a stable machine-readable
 * code, and optional detail payload. Throw inside route handlers/services;
 * the errorHandler middleware converts it into the standard error JSON shape.
 */
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: unknown,
  ) {
    super(message);
    this.name = "AppError";
  }
}

/**
 * errorHandler — Express error middleware. Formats AppError instances into
 * the documented error response shape; logs and returns 500 for anything else.
 */
export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
        details: err.details,
      },
    });
    return;
  }

  console.error("Unhandled error:", err);
  res.status(500).json({
    error: {
      code: "INTERNAL_ERROR",
      message: "An unexpected error occurred",
    },
  });
}
