import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { registerRoutes } from './routes';
import { registerGlobalMiddleware } from './middlewares';

// Load environment variables
dotenv.config();

export const app = express();

// ✅ Register all global middlewares in one line
registerGlobalMiddleware(app);

// Centralized route registration
registerRoutes(app);