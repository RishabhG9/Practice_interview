import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { registerRoutes } from './routes';
import { registerGlobalMiddleware } from './middlewares';
import { errorMiddleware } from './middlewares/errorMiddleware';

// Load environment variables
dotenv.config();

export const app = express();
app.use(express.json());

// ✅ Register all global middlewares in one line
registerGlobalMiddleware(app);

// Centralized route registration
registerRoutes(app);

app.use(errorMiddleware);
