import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/footer/Footer'
import AuthNavbar from '@/components/navbar/AuthNavbar'
import { BubbleBackground } from '@/components/animate-ui/backgrounds/bubble'

export default function AuthLayout() {
 return (
     <>
       <AuthNavbar/>
       <main>
         <BubbleBackground interactive>
            <div className="flex min-h-[calc(100vh-80px)] w-full items-center justify-center p-6 md:p-10">
              <div className="z-10 w-full max-w-sm">
                <Outlet />
              </div>
            </div>
          </BubbleBackground>
       </main>
     </>
   )
}
