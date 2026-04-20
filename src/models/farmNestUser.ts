import mongoose, { Schema, Document } from "mongoose";

const userSchema = new mongoose.Schema({
    password: {
        type : String,
        required : [true, "please add the password"]
    },
    email: {
        type : String,
        required : [true, "please add an email"],
        unique : [true, "email already exists"],
        lowercase :true,
        trim : true
    },
},
  {
    timestamps : true
  }
);


export default mongoose.model("User", userSchema);