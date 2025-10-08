import express from 'express';
import bodyParser from 'body-parser'
import { errorHandler } from './user/error/ErrorHandler.js';
import { registerRoutes } from "./routes.js"
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

registerRoutes(app);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use(errorHandler);


app.listen(PORT, () => {
  console.log(
    `Server running on port: http://localhost:${PORT} in ${process.env.NODE_ENV} mode`
  );
});
