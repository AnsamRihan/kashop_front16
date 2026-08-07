import authAxiosInstance from '@/api/authAxiosInstance'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SideBar } from '../SideBar'
import LanguageSwitcher from '../languageSwitcher/LanguageSwitcher'
import ThemeToggle from '../themeToggle/ThemeToggle'
import Navlink from '../Navlink/Navlink'
import UserMenu from '../UserMenu/UserMenu'
import { Button } from '../ui/button'
import { Search, ShoppingCart } from 'lucide-react'
import { Badge } from '../ui/badge'
import useAuthStore from '@/store/useAuthStore'
import { SearchInput } from '../ui/SearchInput'

export default function Navbar() {

  const token = useAuthStore((state) => state.token);
  const isLoggedIn = !!token;

  return (
    <header className="sticky top-0 z-50 h-20 bg-background shadow-md">
      <div className='container'>
        <div className='w-full h-full row gap-5 justify-between'>
          {/*Left side */}
          <div className='row gap-1.5 md:gap-8'>
            {/* Logo */}
            <div className='center h-full order-2 md:order-1'>
              <Link to="/" className='text-primary text-xl xxs:text-2xl xs:text-[28px] sm:text-[30px] font-bold tracking-[-0.32px]'>
                Kashop
              </Link>
            </div>

            {/*navlinks +/ sidebar */}
            <div className='order-1 md:order-2'>
              <div className='md:hidden'>
                <SideBar />
              </div>
              <div className='hidden md:block'>
                <Navlink />
              </div>
            </div>
          </div>

          {/*Right Side */}
          <div className='row xxs:gap-3 sm:gap-4'>
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Theme Toggle */}
            <ThemeToggle />

            {/*Cart */}
            {isLoggedIn ? (
              <Button variant="ghost" className="relative p-0 group">
                <ShoppingCart className="size-4 xxs:size-5 group-hover:text-primary"/>

                <Badge className="absolute -right-2 -top-1 size-4 rounded-full p-1 text-[7.5px] font-semibold">
                  20
                </Badge>
              </Button>
            ) : null}

            {/*Profile */}
            <div className='hidden md:block'>
              <UserMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
