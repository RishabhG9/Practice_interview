import { Router } from 'express';
import * as UsersController from '@/controllers/usersController/users.controller';
import { authMiddleware } from '@/middlewares/authMiddleware';
import { loggerMiddleware } from '@/middlewares/loggerMiddleware';
import { validateRequest } from '@/middlewares/validateMiddleware';
import * as usersValidator from '@/validators/usersValidator/users.validator';

export const usersRoutes = Router();

usersRoutes.get('/profile', authMiddleware, loggerMiddleware, UsersController.getUserProfile);
usersRoutes.get(
  '/:id',
  validateRequest({ params: usersValidator.userParamSchema, query: usersValidator.userQuerySchema }),
  UsersController.getUserById
);
usersRoutes.post('/register', validateRequest({ body: usersValidator.createUserBodySchema }), UsersController.registerUser);

usersRoutes.post(
  '/register/db',
  validateRequest({ body: usersValidator.createUserBodySchema }),
  UsersController.registerUserDB
);

usersRoutes.get(
  '/userProfile/emailId',
  validateRequest({ query: usersValidator.emailQuerySchema }),
  UsersController.findUserByEmailId
)