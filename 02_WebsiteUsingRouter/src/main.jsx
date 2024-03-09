import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About'
import './index.css'
import { RouterProvider, createBrowserRouter,useLocation} from 'react-router-dom'
import Contact from './components/Contact/Contact.jsx'


const router=createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        path:'home',
        element:<Home/>
      },{
        path:'about',
        element:<About/>
      },{
        path:'contact',
        element:<Contact/>
      }
    ]

  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
