import { NextFunction, Request, Response } from 'express';
import * as UsersService from '@/services/usersService/users.service'
import { AppError } from '@/utils/appError';

export const getUserProfile = async (_req: Request, res: Response, _next: NextFunction) => {
  try {
    const data = UsersService.getUserProfileData();
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

export const registerUserDB = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email } = req.body;
    const user = await UsersService.registerUser(name, email);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: user
    });
  } catch (err) {
    next(err);
  }
};

export const findUserByEmailId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req?.query;

    console.log("EMAIL", email)

    const userDetail = await UsersService.findUserByEmailId(email as string);
    console.log("USE DETAIL", userDetail)
    res.status(200).json({
      success: true,
      message: 'User Found Successfully',
      data: userDetail
    })
  } catch (error) {
    next(error);
  }
}