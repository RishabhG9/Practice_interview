import { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';

// import { errorMiddleware } from './error.middleware';

// Add more global middleware here
export const registerGlobalMiddleware = (app: Express): void => {
  app.use(cors());
  /**
   * CORS stands for Cross-Origin Resource Sharing.
   * By default, a browser restricts frontend apps (e.g. on http://localhost:3000) from accessing APIs on another origin (like http://localhost:5000).
   * This is a security feature.
   * cors middleware allows your server to handle cross-origin requests safely.
   */

  app.use(helmet()); //So Helmet is like a security guard that sets protective headers on every response
};
