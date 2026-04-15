
import User from "../models/farmNestUser.js"
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt"
import type { Request, Response } from "express";
import jwt from "jsonwebtoken"
import env from "dotenv"
env.config()


//@desc check user via email
//@routes POST /api/users/validate
//@access public

const checkEmail = asyncHandler(async (req :Request, res: Response )=>{
 const {email} = req.body
     const allowedFields = ["email"];
const receivedFields = Object.keys(req.body);

const hasExtraFields = receivedFields.some(
  field => !allowedFields.includes(field)
);

if (hasExtraFields) {
  res.status(400).json({ message: "Invalid fields provided" });
   return;
}
 if(!email) {
   res.status(401).json({
    message:"UNAUTHORIZED"
   })
 }
 const checkedEmail =  await User.findOne({email})
  if(!checkedEmail){
    res.status(404)
    throw new Error("User Not Found, kindly Sign Up")
  }
   res.status(200).json({
    message: " user exists"
   })
})

//@desc register user
//@routes POST /api/users/register
//@access public

const registerUser = asyncHandler(async (req : Request, res : Response): Promise<void> => {
const { email, password } = req.body
const allowedFields = [ "email", "password"];
const receivedFields = Object.keys(req.body);
const hasExtraFields = receivedFields.some(
  field => !allowedFields.includes(field)
);

if (hasExtraFields) {
  res.status(400).json({ message: "Invalid fields provided" });
   return
}
 
 if ( !email || !password) {
    res.status(400)
     throw new Error ("All fields are required")
}

const userExists = await User.findOne({email})
if (userExists) {
    res.status(400)
    throw new Error("user already exists")
    
} 
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(password, salt)
const user = await User.create({
    email,
    password: hashedPassword
})
if (user) {
    res.status(201).json({message: "user registered",
        email,
        password
    })
} 
res.status(400).json ({
  message: "failed to create user "
})
})

//@desc LogIn user
//@routes POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const {email, password} = req.body
    const allowedFields = ["email", "password"];
const receivedFields = Object.keys(req.body);

const hasExtraFields = receivedFields.some(
  field => !allowedFields.includes(field)
);

if (hasExtraFields) {
   res.status(400).json({ message: "Invalid fields provided" })
   return;
}
  if (!email || !password) {
    res.status(400)
    throw new Error( "all fields are required " )
  } 
  const user = await User.findOne({email})
  
 if (user && (await bcrypt.compare(password, user.password)))  {
    const accessToken = jwt.sign({
        user : {
             id: user.id,
            userName : user.userName,
            email : user.email
            
        }
    }, process.env.JWT_SECRET!,
    {expiresIn: "1d"}
    
) 
res.status(200).json({
    accessToken,
    userId: user.id,
    userName: user.userName,
    email: user.email,

    // optional: also send separately
});
  } else {
    res.status(401)
    throw new Error("email or password invalid")
  }});

  //@desc GET user
//@routes POST userName
//@access public

const controllers = {
  checkEmail,
  registerUser
}
export default controllers