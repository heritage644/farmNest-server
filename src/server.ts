import express from "express";
import env from "dotenv";
import Routers from "./routes/authRoute.js";
import connectDB from "./models/dbconnection.js";
import errorHandler from "./middlewares/genError.js";
import router from "./routes/getUserRoute.js";
import cors from "cors"
import profileRouter from "./routes/getProfilr.js";
env.config();
const app = express();
app.use(cors())
connectDB()
app.use(express.json())

const port =  process.env.PORT || 3000 

app.use( 
    "/api/users",Routers)
app.use(
    "/api/users",profileRouter
)
    app.use(
        "/api/users",router
    )
app.use(errorHandler)
app.listen(port,()=> {
console.log(`App is ruuning on ${port}`)
})
