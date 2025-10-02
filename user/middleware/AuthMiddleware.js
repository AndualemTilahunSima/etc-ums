// middleware/auth.js
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secret-key.js";
import logger from '../log/logger.js';

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split("Bearer ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // attach user info to request
    next();
  } catch (err) {
    logger.error(`401 - Invalid token - ${req.originalUrl} - ${req.method} - ${req.ip} - ${err.message}`);
    res.status(401).json({ message: "Invalid token" });
  }
}
