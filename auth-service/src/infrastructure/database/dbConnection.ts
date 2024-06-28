import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

export default async()=>{
    try {
        const mongoUrl=process.env.MONGO_URL;
        console.log(
            mongoUrl
        );
        
        if(!mongoUrl){
            throw new Error ('MongoDB connection string not provide in environement variles')
        }
       
        await mongoose.connect(mongoUrl.trim())

        console.log(`
        🍃🍃 MongoDB connected successfully!🍃🍃 
        `)


    } catch (error) {
        console.error('❌❌❌Database connection error :',error)
        process.exit(1)
    }
}

