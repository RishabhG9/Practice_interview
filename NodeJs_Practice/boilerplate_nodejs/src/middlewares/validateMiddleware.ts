import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { AppError } from '../utils/appError';

type ValidateOptions = {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
};

export const validateRequest = (schemas: ValidateOptions) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      if (schemas.body) {
        const result = schemas.body.safeParse(req.body);
        if (!result.success) {
          return next(new AppError('Request body validation failed', 400, result.error.flatten().fieldErrors));
        }
      }

      if (schemas.query) {
        const result = schemas.query.safeParse(req.query);
        if (!result.success) {
          return next(new AppError('Query validation failed', 400, result.error.flatten().fieldErrors));
        }
      }

      if (schemas.params) {
        const result = schemas.params.safeParse(req.params);
        if (!result.success) {
          return next(new AppError('Params validation failed', 400, result.error.flatten().fieldErrors));
        }
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};
