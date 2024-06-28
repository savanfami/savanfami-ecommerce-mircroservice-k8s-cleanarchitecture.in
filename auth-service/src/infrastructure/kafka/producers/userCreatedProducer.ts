import {Schema} from 'mongoose'
import { producer } from '..';


export const userCreatedProducer = async(
    data:{
        _id: Schema.Types.ObjectId;
        username: string;
        email: string;
        password:string;
        role: string;
        isBlocked:Boolean
    }
)=>{
    try {
        console.log('producer conecting.....')
        await producer.connect();
        console.log('producer connected');
        
        if(data.role == 'user' || data.role == 'admin'){
            const message = {
                topic: 'to-user',
                messages: [{
                    key:'userCreated',
                    value:JSON.stringify((data))
                }]
            };
            console.log('message created:',message);
            
            await  producer.send(message);
            console.log('massages is completed');
            
        }else{
            throw new Error("undefined role")
        }

    } catch (error:any) {
        console.error('kafka produce error:',error)
    }finally{
        await producer.disconnect();
    }
}