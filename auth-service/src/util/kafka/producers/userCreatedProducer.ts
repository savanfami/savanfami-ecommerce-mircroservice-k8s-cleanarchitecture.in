import { Schema } from "mongoose";
import { producer } from "..";

export const userCreatedProducer=async(data:{
    _id:Schema.Types.ObjectId,
    username:string,
    email:string,
    password:string,
    role:string,
    isBlocked:boolean
})=>{
    try {
        await producer.connect()
        if(data.role=='user' || data.role=='admin'){
            const message={
                topic:'to-user',
                messages:[{
                    key:'userCrated',
                    value:JSON.stringify(data)
                }]
            }
            await producer.send(message)
        }else{
            throw new Error('Undifined user Role')
        }
    } catch (error:any) {
        console.error('kafka producer error :',error)
    }finally{
        await producer.disconnect()
    }
}