import express from "express";
const router = express.Router()
import controllers from "../controllers/user-controller.js";
const {checkEmail} = controllers


router.post("/validate" , checkEmail);


const Routers = router
export default Routers