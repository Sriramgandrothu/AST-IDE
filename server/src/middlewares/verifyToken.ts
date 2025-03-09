import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

export interface AuthRequest extends Request {
  _id?: string;
}

export const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      res.status(401).json({ message: "Unauthorized: No token provided." });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY!) as { _id: string };
    req._id = decoded._id;
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      res.status(401).json({ message: "Unauthorized: Invalid token." });
      return;
    }
    res.status(500).json({ message: "Internal server error." });
  }
};