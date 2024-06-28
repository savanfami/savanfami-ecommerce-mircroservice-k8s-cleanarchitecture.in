import { UserEntity } from "../../../../domain/entities";
import { User } from "../models/loginCredintial";


async function findByEmail(email:string):Promise<UserEntity | null>  {
    try {
        const user=await User.findOne({email})
        return user
    } catch (error) {
        throw error
    }
}
export {findByEmail}