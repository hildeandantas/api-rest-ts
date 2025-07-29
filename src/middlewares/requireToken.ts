import e, { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import "dotenv/config";

export const requireToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }
  try {
    verify(token, process.env.JWT_SECRET as string, (error) => {
      if (error) {
        return res.status(401).json({ message: "Invalid token" });
      }
      next();
    });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
