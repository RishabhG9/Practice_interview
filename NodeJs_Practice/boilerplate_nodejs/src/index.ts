import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// -------- Middlewares ---------
app.use(cors());
/**
 * CORS stands for Cross-Origin Resource Sharing.
 * By default, a browser restricts frontend apps (e.g. on http://localhost:3000) from accessing APIs on another origin (like http://localhost:5000).
 * This is a security feature.
 * cors middleware allows your server to handle cross-origin requests safely.
 */

app.use(helmet());
/**
 * So Helmet is like a security guard that sets protective headers on every response
 */
app.use(express.json());

// Health check route
app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({ message: 'API is running 🚀' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
