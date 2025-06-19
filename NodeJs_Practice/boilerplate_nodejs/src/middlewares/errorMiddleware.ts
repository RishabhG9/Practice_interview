import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { AppError } from '../utils/appError';

export const errorMiddleware: ErrorRequestHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof AppError) {
    res.status(err.status).json({
      success: false,
      message: err.message,
      errors: err.errors || null
    });
    return 
  }

  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: err.message || 'Unknown error',
  });
};
