import express from "express";
const router = express.Router()
import { userValidateToken } from "../middlewares/ussserMiddleware.js";
import controllers from "../controllers/user-controller.js";
const {checkEmail,
    registerUser,
    loginUser
} = controllers


router.post("/validate" , checkEmail);
router.post("/register", registerUser )
router.post("/login", loginUser)


const Routers = router
export default Routers