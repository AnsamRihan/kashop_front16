import React from 'react'
import { Link } from 'react-router-dom'
import LanguageSwitcher from '../languageSwitcher/LanguageSwitcher';
import ThemeToggle from '../themeToggle/ThemeToggle';

export default function AuthNavbar() {
  
  return (
    <header className="sticky top-0 z-50 h-20 bg-background shadow-md">
        <div className='container'>
          <div className='w-full h-full flex items-center justify-between'>
            {/* Logo */}
            <div className='center h-full'>
              <Link to="/" className='text-primary text-2xl xs:text-[28px] sm:text-[32px] font-bold tracking-[-0.32px]'>Kashop</Link>
            </div>

            {/* Icons */}
            <div className='row'>
              {/* Language Switcher */}
              <LanguageSwitcher />
              {/* Theme Toggle */}
              <ThemeToggle />
            </div>
          </div>
        </div>
    </header>
  )
}
