import React, { useRef } from 'react'
import { ToastContainer } from 'react-toastify';
import { Routes, Route, Link } from 'react-router-dom'
import Signin from './Login/Signin.jsx'
import Signup from './Login/Signup.jsx'
import Home from './components/componestsImp/Home.jsx'
import Adminpanel from './components/componestsImp/Adminfolder/Adminpanel.jsx'
import SidebarLayout from './components/ui/SidebarLayout.jsx'
import Dialogbox from './components/ui/Dialogbox.jsx'
import Pending from './components/componestsImp/Adminfolder/Pending.jsx'
import Addproduct from './components/componestsImp/Adminfolder/Addproduct.jsx'
import AdminSidebarLayout from './components/componestsImp/Adminfolder/AdminSidebarLayout.jsx'
import Category from './components/componestsImp/Adminfolder/Category.jsx'
import ListingProducts from './components/componestsImp/Adminfolder/ListingProducts.jsx'
const App = () => {

  return (

    <div>
      <ToastContainer />
      <Routes>
        <Route element={
          <SidebarLayout />
        } >
          <Route path='/' element={<Home  />} />
        </Route>
        <Route path='/signin' element={<Signin/>} />
        <Route path='/signup' element={<Signup  />} />
        <Route element={<AdminSidebarLayout />} >
          <Route path='/admin' element={<Adminpanel />} />
          <Route path='/pending' element={<Pending />} />
          <Route path='/add' element={<Addproduct />} />
          <Route path='/category' element={<Category />} />
          <Route path='/products' element={<ListingProducts />} />
        </Route>
        <Route path='/dialog' element={<Dialogbox />} />


      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App