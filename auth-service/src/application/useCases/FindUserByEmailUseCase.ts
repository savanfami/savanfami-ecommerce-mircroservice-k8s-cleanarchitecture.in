import { IDependencies } from "../interfaces/IDependencies";
import { UserEntity } from "../../domain/entities";

export const findUserByEmailUerCase=(dependencies:IDependencies)=>{
    const {repositories}=dependencies

    return {
        execute:async(email:string):Promise<UserEntity | null>=>{
            return await repositories.findByEmail(email)
        }
    }
}