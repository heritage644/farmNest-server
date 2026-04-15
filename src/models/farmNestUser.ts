const mongoose = require("mongoose")
const userSchema = mongoose.Schema({

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
module.exports = mongoose.model("users", userSchema);