import { Router } from 'express';
import { getUserProfile } from '../../controllers/userController/controller';

export const userRoutes = Router();

userRoutes.get('/profile', getUserProfile);
