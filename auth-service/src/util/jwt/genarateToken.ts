import jwt from  'jsonwebtoken'



export default (payload:{userId:string,userEmail:string,isAdmin:boolean,isBlock:boolean})=>{
    return jwt.sign(payload,String(process.env.Auth_JWT_SECRET),{expiresIn:60*60*24})
}

