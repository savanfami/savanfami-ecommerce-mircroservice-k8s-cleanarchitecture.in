import { User } from "../models/loginCredintial";
import { UserEntity } from "../../../../domain/entities";


export const signup = async(
    data:UserEntity
):Promise<UserEntity | null>=>{
    try {
        const newUser = await User.create(data)

        if(!newUser){
            throw new Error("user creation failed")
        }

        return newUser as UserEntity
    } catch (error:any) {
        throw new Error(error?.message);
        
    }
}
