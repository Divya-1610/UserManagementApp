import React, { useEffect, useState } from 'react'
import {Navigate} from 'react-router'
import { API_URL } from '../config.js'

function Userlist() {
  const [users,setusers]=useState([])
  const[status,setstatus]=useState('')
  const[table,displaytable]=useState(true)

  useEffect(()=>{
    const getusers=async()=>{
      try{
      let res= await fetch(`${API_URL}/users`)
      let data= await res.json()
      if (res.status==200)
      {
        setusers(data.payload)
        setstatus('USERS DATA')
      }
      else{
        displaytable(false)
      }
    }
    catch(err)
    {
      setstatus(err.message)
    }
    };getusers()
  },[])
  console.log(users)

  return (
    <div>
      
      <h1 className='text-center text-2xl m-2 font-bold bg-yellow-300 rounded-full p-3'>{status}</h1>
      <div className='mt-5 '>
        <table className='w-full text-left border-separate border-spacing-y-3 border-spacing-x-3'>
        <thead className=' bg-blue-200'>
          <th>Name</th>
          <th>Email</th>
          <th>Mobile No</th>
          <th>Date of Birth</th>
          <th>Created At</th>
        </thead>
        
       <tbody>
          {
            users.map((userobj)=>
              
                <tr>
                  <td>{userobj.username}</td>
                  <td>{userobj.email}</td>
                  <td>{userobj.mobile}</td>
                  <td>{userobj.dob}</td>
                  <td>{userobj.createdAt}</td>
                </tr>
              
            )
          }
       </tbody>
      </table>
      </div>
    </div>
  )
}

export default Userlist