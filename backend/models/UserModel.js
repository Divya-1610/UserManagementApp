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
    timestamps:true
   }
   
)

export const userModel= model("user", userschema)