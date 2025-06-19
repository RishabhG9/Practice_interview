import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
    return; // ✅ early return (no implicit undefined)
  }

  // You might verify token here in real case
  next(); // ✅ Always call next() if passed
};
