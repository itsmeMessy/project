import React from 'react'
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import Login from './components/Login/Login'
import Signup from './components/Login/Signup'

import Books from './components/Home/User/Homepage/BrowserBooks/Books'
import Available from './components/Home/User/Homepage/BrowserBooks/Available'
import Unavailable from './components/Home/User/Homepage/BrowserBooks/Unavailable'
import Editprofile from './components/Home/User/Homepage/Profile/Editprofile'
import Mybooks from './components/Home/User/Homepage/Profile/Mybooks'
import BorrowedBooks from './components/Home/User/Homepage/AccountManagement/BorrowedBooks'
import Returnbooks from './components/Home/User/Homepage/AccountManagement/Returnbooks'
import Renewbooks from './components/Home/User/Homepage/AccountManagement/Renewbooks'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Home from './components/Home/Admin/Homepage/Home'
import Home1 from './components/Home/SuperAdmin/Home'
import Reset from './components/Login/Reset'
import R from './components/Login/R'
import AdminProtectedRoute from './components/ProtectedRoute/AdminProtectedRoute'
import SPProtect from './components/ProtectedRoute/SPProtec'

export default function App() {

  return (
   <BrowserRouter>
    <Routes>
      <Route path = '/' element ={<Login />} />
      <Route path = "/create_account" element = {<Signup /> } />

      <Route element={<ProtectedRoute />}>
       <Route path = '/allbooks' element = {<Books /> } />
      <Route path = '/available' element = {<Available /> } />
      <Route path = '/unavailable' element = {<Unavailable /> } />
      <Route path = "/editprofile" element = {<Editprofile /> } />
      <Route path = "/mybooks" element = {<Mybooks />} />
      <Route path = "/borrowedbooks" element = {<BorrowedBooks />} />
      <Route path = "/returnbooks" element = {<Returnbooks />} />
      <Route path = "/renewbooks" element = {<Renewbooks />} />
      </Route>

      <Route path = '/reset_pass' element = {<Reset />} />
      <Route path = '/reset_password/:token' element = {<R />} />
    
  
       
      <Route element = {<AdminProtectedRoute />} >
      <Route  path="/admin/*" element={<Home />} />
      </Route>
      <Route element = {<SPProtect />} >  
      <Route path = "/sp/*" element = {<Home1 />} />
      </Route>
    </Routes>
   </BrowserRouter>
  )
}
