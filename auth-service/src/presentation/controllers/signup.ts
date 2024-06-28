import { NextFunction,Request,Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { passwordHashing } from "../../util/bcrypt/passwordHashing";
import genarateToken from "../../util/jwt/genarateToken";
import { userCreatedProducer } from "../../util/kafka/producers/userCreatedProducer";


export  const signup=(dependancies:IDependencies)=>{
    const {useCases:{signupUserUseCase,findUserByEmailUerCase}}=dependancies;
    return async (req:Request,res:Response,next:NextFunction):Promise<void> =>{
        try {
            const credential=req.body
            console.log('user credentials :',credential);
            
            if(!credential.username.trim()){
                res.status(400).json({success:false,message:'user name not be empty'})
                return
            }

            if(!credential.password|| !credential.email){
                res.status(400).json({success:false,message:'password and Email not be empty'})
                return;
            }
            const emailRegex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(credential.email)){
                res.status(400).json({success:false,message:'Invalid email format'})
                return;   
            }
            if(credential.password.length<6){
                res.status(400).json({status:false,message:'Password must be at least 6 charecters'})
                return;
            }

            try {
                const existingUser=await findUserByEmailUerCase(dependancies).execute(credential.email)

                if(existingUser){
                    res.status(400).json({success:false,message:'Email alredy exists'})
                    return;
                }
            } catch (error) {
                console.error('Erro finding user by email:' ,error)
            }

            const hashedPassword: string | null = await passwordHashing(credential.password);
            credential.password=hashedPassword;
            const user=await signupUserUseCase(dependancies).execute(credential);

            if(user){
                const userId:string=user._id?.toString()?? "";
                const token=genarateToken({
                    userId:userId,
                    userEmail:user.email,
                    isAdmin:user.isBlocked,
                    isBlock:user.isBlocked
                })
                res.cookie('auth',token,{
                    maxAge:1000*60*60*24,
                    httpOnly:true
                })

                res.status(201).json({success:true,data:user,message:'User Created'})
                const addedUser = {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    role: user.role,
                    isBlocked: user.isBlocked,
                  
                  };
                  if (addedUser) {
                    console.log(addedUser,'this is addeduser');
                    
                    await userCreatedProducer(addedUser);
                    console.log('user producer complete');
                    
                  }
            }else{
                res.status(404).json({success:false,message:'User not found'})
            }

        } catch (error) {
            next(error)
        }
    }
}



