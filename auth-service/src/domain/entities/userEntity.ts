import {ObjectId, Schema} from 'mongoose';


enum Role{
    use='user',
    admin='admin'
}

export  interface UserEntity{
    _id:Schema.Types.ObjectId;
    username:string;
    email:string;
    password:string;
    role:Role;
    isBlocked:boolean
}