import { NextFunction, Request, Response } from 'express';
import { Result, ValidationError, validationResult } from 'express-validator';

export async function reqValidationResult(req: Request, res: Response, next: NextFunction): Promise<void> {
  const errors: Result<ValidationError> = validationResult(req);
  if (errors.isEmpty()) {
    next();
    return;
  }

  next(res.status(400).json({ 'Fields validation error': errors.array() }));
  return;
}
