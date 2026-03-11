import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
function Adduser() {

  let {register, handleSubmit,reset}=useForm()
  const [created, setcreated] = useState('')


  async function createuser(userobj){
    console.log(userobj)
    reset()
    try{
      let res= await fetch("http://localhost:3000/user-api/users",{
        method:"POST",
        headers:{
          "content-Type": "application/json"
        },
        body:JSON.stringify(userobj)
      })
      if (res.status==201)
        setcreated('user created successfully')
      else
        throw new Error ("user data is invalid")
    }
    catch(err){
      setcreated(err.message)

    }
  }

  return (
    <div className='flex flex-col items-center mt-10'>
      <div className='text-center  flex flex-col items-center w-[60%] p-5'>
      <h1 className='text-2xl p-4 font-bold bg-yellow-300 m-5 rounded-full'>Add New user</h1>
      <form onSubmit={handleSubmit(createuser)} className='w-[80%]'>
        <div className='grid grid-cols-1 gap-3'>
          <input className='border m-2 w-full p-3' type="text" {...register("username")} required placeholder='name' />
        <input className='border m-2 w-full p-3' type="email" {...register("email")} required placeholder='email'/>
        <input className='border m-2 w-full p-3' type="date" {...register("dob")} required placeholder='date of birth'/>
        <input className='border m-2 w-full p-3' type="number" {...register("mobile")} required placeholder='phone no' />

        </div>
        <div>
          <button className='bg-blue-300 rounded-2xl px-10 p-3 m-3 hover:cursor-pointer hover:bg-blue-600 hover:text-white' type='submit'>Submit</button>
        </div>
      </form>
      
    </div>
     <h1 className='text-red-500 text-4xl p-3'>{created}</h1>
    </div>
  )
}

export default Adduser