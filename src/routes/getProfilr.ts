import express from "express"
import { userValidateToken } from "../middlewares/ussserMiddleware.js";
import profileMethods from "../controllers/profile-controller.js";
const {getUserProfile, updateUserProfile, deleteUserProfile, upsertUserAddress} = profileMethods
const profileRouter = express.Router()


profileRouter.put("/addprofile",userValidateToken, updateUserProfile)
profileRouter.put("/addAddress",userValidateToken, upsertUserAddress)
profileRouter.get("/profile",userValidateToken, getUserProfile)
profileRouter.delete("deleteProfile",userValidateToken, deleteUserProfile)

export default profileRouter