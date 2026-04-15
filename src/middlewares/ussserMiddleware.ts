import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler";
import User from "../models/farmNestUser.js"; // Adjust path as needed

// 1. Define what the decoded token looks like
interface DecodedToken {
  user: {
    id: string;
  };
}

// 2. Extend the Express Request type to include 'user'
export interface AuthRequest extends Request {
  user?: any; // You can replace 'any' with your User Document type later
}

const userValidateToken = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token: string | undefined;

  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    try {
      token = authHeader.split(" ")[1]; // get token from header
      
      // Verify token
      const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as unknown as DecodedToken;

      // Attach user to request (req.user is now allowed because of AuthRequest)
      req.user = await User.findById(decoded.user.id).select("-password");
      
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { userValidateToken };