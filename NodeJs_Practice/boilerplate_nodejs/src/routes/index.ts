import { Express } from 'express';
import { userRoutes } from './userRoutes/routes';

export const registerRoutes = (app: Express): void => {
  app.use('/api/users', userRoutes);

  // You can keep adding more like this:
  // app.use('/api/auth', authRoutes);
  // app.use('/api/meals', mealRoutes);
};