import { Request, Response, NextFunction } from "express";
import jwtDecode from "jwt-decode";

export const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({ message: "User not authenticated" });
  }
};
