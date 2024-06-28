import { IDependencies } from '../../application/interfaces/IDependencies'
import { loginController } from "./login";
import { signup } from "./signup"
export const controllers = (dependencies: IDependencies)=>{
    return{
        signup: signup(dependencies),
        login: loginController(dependencies),
    }
}