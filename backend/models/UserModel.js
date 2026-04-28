import {model,Schema} from 'mongoose'

const userschema = new Schema(
   {
    username :{
    type:String,
    minLength:3,
    required : [true,'enter username']
   },

   email:{
    type:String,
    required:[true,'enter email'],
    unique:[true,'email already exists'],
   },

   dob:{
    type:Date,
    required:true,
   },
   
   mobile:{
    type:Number,
    min:1000000000,
    required:[true,'enter mobile no']
   },
   isActive:{
      type:Boolean,
      default:true,
   }

   },
   {
    timestamps:true,
    toJSON: {
      transform: (doc, ret) => {
        // Format dob to YYYY-MM-DD
        if (ret.dob) {
          ret.dob = ret.dob.toISOString().split('T')[0];
        }
        // Format timestamps to a readable string without 'Z'
        if (ret.createdAt) {
          ret.createdAt = ret.createdAt.toISOString().replace('T', ' ').split('.')[0];
        }
        return ret;
      }
    }
   }
   
)

export const userModel= model("user", userschema)