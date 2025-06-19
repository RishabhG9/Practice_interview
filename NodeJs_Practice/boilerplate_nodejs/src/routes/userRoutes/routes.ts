import { Router } from 'express';
import { getUserById, getUserProfile, registerUser } from '../../controllers/userController/controller';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { loggerMiddleware } from '../../middlewares/loggerMiddleware';
import { validateRequest } from '../../middlewares/validateMiddleware';
import { createUserBodySchema, userParamSchema, userQuerySchema } from '../../validators/userValidator/validator';

export const userRoutes = Router();

userRoutes.get('/profile', authMiddleware, loggerMiddleware, getUserProfile);
userRoutes.get(
  '/:id',
  validateRequest({ params: userParamSchema, query: userQuerySchema }),
  getUserById
);
userRoutes.post('/register', validateRequest({ body: createUserBodySchema }), registerUser);