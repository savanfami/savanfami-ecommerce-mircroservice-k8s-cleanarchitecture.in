import { User } from "../models/loginCredintial";
import { UserEntity } from "../../../../domain/entities";
import { UserLoginEntity } from "../../../../domain/entities";
import bcrypt from 'bcrypt'


export const login=async(data:UserLoginEntity):Promise <UserEntity | null> =>{
    try {
        const user:UserEntity|null = await User.findOne({email:data.email})
        if(user){
            const isMatch:boolean=await bcrypt.compare(data.password,user.password)
            if(!isMatch){
                throw new Error("user name of password incorrect")
            }else{
                return user as UserEntity
            }

        }else{
            throw new Error ('User not found')
        }
    } catch (error:any) {
        throw new Error(error?.massage);
        
    }
}


