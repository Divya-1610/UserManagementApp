import React from 'react'
import { NavLink } from 'react-router'

function Header() {
  return (

    <div className='flex flex-wrap justify-between bg-black text-white p-2'>
        <div className='bg-gray-200 rounded-full p-5 mx-2'>-</div>
            <ul className='flex justify-evenly text-2xl gap-5 mr-10'>
                <li><NavLink to='/'>Home</NavLink></li>
                <li><NavLink to='adduser'>Add-user</NavLink></li>
                <li><NavLink to='userlist'>user-list</NavLink></li>
            </ul>
    </div>
  )
}

export default Header