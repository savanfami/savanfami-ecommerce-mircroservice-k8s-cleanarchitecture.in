import { Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import {controllers} from '../../presentation/controllers/index'

export const authRoutes=(dependencies:IDependencies)=>{
    const {signup,login}=controllers (dependencies)
    console.log('request recieved ');
    
    const router =Router();
    router.route('/signup').post(signup)
    router.route('/login').post(login)
    return router;
}