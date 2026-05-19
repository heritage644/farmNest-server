import asyncHandler from "express-async-handler";
import Product from "../models/productsSchema.js";
//@desc get user products
//@routes GET /api/products
//@access public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.json(products);
});
const getAllProducts = {
    getProducts
};
export default getAllProducts;
//# sourceMappingURL=productController.js.map