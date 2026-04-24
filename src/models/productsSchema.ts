import mongoose , { Schema, Document } from "mongoose";

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "please add the product name"]
    },
    price : {
        type : Number,
        required : [true, "please add the product price"]
    },
   Image : {
        type : String,
        required : [true, "please add the product image"]
    },
    description : {
        type : String,
        required : [true, "please add the product description"]
    },
    Category : {
        type : String,
        required : [true, "please add the product category"]
    },
    stock : {
    type : Number,
    required : [true, "please add the product stock"]
    },
    rating : {
        type : Number,
        min : 0,
        max : 5,
        default : 0
       
    },
},{
    timestamps : true
})
export default mongoose.model("Product", productSchema)     