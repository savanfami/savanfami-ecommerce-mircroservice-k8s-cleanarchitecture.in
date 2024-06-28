import {Schema,model,Document} from 'mongoose'
import { UserEntity } from '../../../../domain/entities'
import mongoose from 'mongoose'


const userSchema =new Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
      },
      isBlocked: {
        type: Boolean,
        default: false,
      },
    },{
      timestamps: true
    });
    
    export const User = mongoose.model<UserEntity>("logincredentials", userSchema);