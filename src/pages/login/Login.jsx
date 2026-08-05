import { BubbleBackground } from '@/components/animate-ui/backgrounds/bubble'
import { LoginForm } from '@/components/LoginForm'
import React from 'react'

export default function Login() {
  return (
    <>
      <BubbleBackground interactive>
        <div className="flex h-[calc(100vh-80px)] w-full items-center justify-center p-6 md:p-10">
          <div className="z-10 w-full max-w-sm">
            <LoginForm/>
          </div>
        </div>
      </BubbleBackground>
    </>
  )
}
