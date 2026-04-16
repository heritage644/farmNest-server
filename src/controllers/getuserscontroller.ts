
import asyncHandler from "express-async-handler";
import type{ Request, Response } from "express";
import type { AuthRequest } from "../middlewares/ussserMiddleware.js";
const getDashboardUser = asyncHandler(async (req:AuthRequest, res:Response):Promise<void> => {
  if (!req.user) {
    res.status(404).json({ message: "User not found" });
     return;
  }

  res.status(200).json(req.user);
});
const  getAllUsers = {
    getDashboardUser
}
export default  getAllUsers