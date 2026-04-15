import express from "express";
import env from "dotenv";
env.config();
const app = express();
app.use(express.json())
import Routers from "./routes/authRoute.js";
const port =  process.env.PORT || 3000 

app.use( 
    "/api/users",Routers)

app.listen(port,()=> {
console.log(`App is ruuning on ${port}`)
})
