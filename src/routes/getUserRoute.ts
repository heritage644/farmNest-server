import express from "express"
import { userValidateToken } from "../middlewares/ussserMiddleware.js";
import expressAsyncHandler from "express-async-handler";
const router = express.Router()
import getAllUsers from "../controllers/getuserscontroller.js";
const {getDashboardUser} = getAllUsers

router.get("/me",userValidateToken, getDashboardUser)
export default router