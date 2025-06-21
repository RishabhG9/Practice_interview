import { Express } from 'express';
import { usersRoutes } from './usersRoutes/usersRoutes';

export const registerRoutes = (app: Express): void => {
  app.use('/api/users', usersRoutes);

  // You can keep adding more like this:
  // app.use('/api/auth', authRoutes);
  // app.use('/api/meals', mealRoutes);
};