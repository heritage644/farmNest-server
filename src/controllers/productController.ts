
import asyncHandler from "express-async-handler";
import type { Request, Response } from "express";
import Product from "../models/productsSchema.js";


//@desc get user products
//@routes GET /api/products
//@access public

const getProducts = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const products = await Product.find();
  res.json(products);
});
const getAllProducts ={
    getProducts
}
export default getAllProducts