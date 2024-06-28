import express,{ Application, NextFunction, Request, Response } from "express";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import morgan  from "morgan";
import { authRoutes } from "../infrastructure/routes/authRoutes";
import {dependencies} from '../config/dependencies'

dotenv.config()

const app: Application =express();
const port:number=Number(process.env.port)|| 3001

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(morgan('short'))
// app.use('/',authRoutes(dependa))

app.use((err:Error,req:Request,res:Response,next:NextFunction)=>{
    console.log(err);
    const erroResponse={
        errors:[{message:err?.message || "Somthing went wrong"}],

    }
    return res.status(500).json(erroResponse)
})

app.use('/',authRoutes(dependencies))


app.listen(port,()=>{
    console.log(`connect to auth service at${port}`);
    
})
 
export default app;