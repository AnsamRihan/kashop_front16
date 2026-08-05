import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/footer/Footer'
import AuthNavbar from '@/components/navbar/AuthNavbar'

export default function AuthLayout() {
 return (
     <>
       <AuthNavbar />
       <main>
         <Outlet />
       </main>
     </>
   )
}
