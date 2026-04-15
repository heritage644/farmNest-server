import express from "express";
const router = express.Router()
import controllers from "../controllers/user-controller.js";
const {checkEmail,
    registerUser
} = controllers


router.post("/validate" , checkEmail);
router.post("/register", registerUser )


const Routers = router
export default Routers