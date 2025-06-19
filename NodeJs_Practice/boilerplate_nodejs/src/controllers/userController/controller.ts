import { Request, Response } from 'express';
import { getUserProfileData } from '../../services/userService/service';

export const getUserProfile = async (_req: Request, res: Response) => {
  try {
    const data = getUserProfileData();
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
};
