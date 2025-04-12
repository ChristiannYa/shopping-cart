import { Request, Response, NextFunction } from "express";
import { User } from "../lib/definitions";
import { authService } from "../services/authService";

export interface AuthRequest extends Request {
  user?: User;
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: "Access token required" });
    return;
  }

  const user = authService.verifyToken(token);

  if (!user) {
    res.status(403).json({ message: "Invalid or expired token" });
    return;
  }

  req.user = user;
  next();
};
