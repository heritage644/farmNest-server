import express from "express";
import env from "dotenv";

import mongoose from "mongoose"
env.config();
const app = express();
app.use(express.json())
const port =  process.env.PORT || 3000 

app.listen(port,()=> {
console.log(`App is ruuning on ${port}`)
})
