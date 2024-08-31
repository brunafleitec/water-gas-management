import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const [error] = errors.array({ onlyFirstError: true });
    return res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: error.msg,
    });
  }
  next();
};
