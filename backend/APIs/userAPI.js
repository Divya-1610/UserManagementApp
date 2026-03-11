import exp from 'express'
import { userModel } from '../models/UserModel.js'

export const userapp= exp.Router()

userapp.get('/users',async(req,res)=>{
    let users = await userModel.find()
    res.status(200).json({message:"users List", payload:users})
})

userapp.get('/users/:id',async(req,res)=>{
    let userid=req.params.id
    let user= await userModel.findById(userid)
    if (user)
        res.status(200).json({message:"user found",payload:user})
    else
        res.status(404).json({message:"user not found"})
})

userapp.post('/users',async(req,res)=>{
    let newuser=req.body
    let user= new userModel(newuser)
    await user.save()
    res.status(201).json(user)
})


//hard delete
userapp.delete('/user/del/:id',async(req,res)=>{
    let user= await userModel.findByIdAndDelete(req.params.id)

    if (user)
        res.status(200).json({message:"user deleted",payload:user})
    else
        res.status(404).json({message:"user not found"})

})

//soft delete/block user
userapp.put('/users/block/:id',async(req,res)=>{
    let user= await userModel.findById(req.params.id)
    if (user)
    {
        let deleteduser= await userModel.findByIdAndUpdate(req.params.id,{$set:{isActive:false}})
        return res.status(201).json({message:"user deletd",payload:deleteduser})
    }
    else
        res.status(404).json({message:"user not found"})
})

//put request are for complete change and patch for partial change
//activate user
userapp.patch('/users/activate/:id',async(req,res)=>{
    let user= await userModel.findById(req.params.id)

    if (user)
    {
        await userModel.findByIdAndUpdate(req.params.id,{$set:{isActive:true}})
        return res.status(200).json({message:"user activated",payload:user})
    }
    res.status(404).json({message:"user not found...."})
})

//update user
userapp.put('/users/update/:id',async(req,res)=>{
    let user=await userModel.findById(req.params.id)
    let modifieduser=req.body
    if (user && user.isActive==true)
    {
        let newuser=await userModel.findByIdAndUpdate(req.params.id,{$set:{...modifieduser}})
        return res.status(201).json({message:"user updated",payload:newuser})
    }
    res.status(404).json({message:"user updated"})
})