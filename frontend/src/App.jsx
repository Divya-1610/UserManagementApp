import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Rootlayout from './components/Rootlayout'
import Home from './components/Home.jsx'
import Adduser from './components/Adduser'
import Userlist from './components/Userlist'

function App() {
  const routerobj=createBrowserRouter([
    {path:'/',element:<Rootlayout/> ,
      children:[
        {path:'',element:<Home/>},
        {path:"adduser",element:<Adduser/>},
        {path:'userlist',element:<Userlist/>}
      ]
    }
  ])

  return (
   <RouterProvider router={routerobj}/>
  )
}

export default App