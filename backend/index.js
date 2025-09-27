import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import connectDB from './mongo/connectDB.js'
import userRouter from './routes/user.routes.js'
import projectRoutes from "./routes/project.routes.js";
import addressRouter from './routes/address.routes.js';
import salaryRouter from './routes/salary.routes.js'




const app = express()

app.use(cors({
    credentials:true,
    origin:process.env.FRONTEND_URL
}))

app.use(express.json())
app.use(cookieParser())
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy:true
}))

const PORT =  process.env.PORT || 4000

app.get( "/" , (req , res) =>{
    res.json({
        madeby: "MO HASIM",
        message: "server is runnig",
        port: PORT,

    })
})


app.use('/api/user' ,userRouter)
app.use("/api/projects", projectRoutes);
app.use("/api/address", addressRouter);
app.use("/api/salary", salaryRouter);


connectDB().then( () => {

    app.listen(PORT , () =>{
        console.log("server is running " , PORT)
    }) 
    
})