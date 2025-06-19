import { Router } from 'express';
import { getUserProfile } from '../../controllers/userController/controller';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { loggerMiddleware } from '../../middlewares/loggerMiddleware';

export const userRoutes = Router();

userRoutes.get('/profile', loggerMiddleware, authMiddleware, getUserProfile);
