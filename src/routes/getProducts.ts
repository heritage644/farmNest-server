import express from "express"
import { userValidateToken } from "../middlewares/ussserMiddleware.js";
import expressAsyncHandler from "express-async-handler";
const routes = express.Router()
import getAllProducts from "../controllers/productController.js";
const {getProducts} = getAllProducts

routes.get("/fruits", getProducts)
export default routes