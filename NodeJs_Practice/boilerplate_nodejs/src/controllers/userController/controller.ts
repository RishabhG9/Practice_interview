import { NextFunction, Request, Response } from 'express';
import { getUserProfileData } from '../../services/userService/service';

export const getUserProfile = async (_req: Request, res: Response, _next: NextFunction) => {
  try {
    const data = getUserProfileData();
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req?.params;
  const { active } = req?.query;

  res.status(200).json({
    success: true,
    user: { id, active },
  });
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email } = req.body;

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    user: { name, email }
  });
};
