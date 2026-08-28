import React from 'react'
import { Link } from 'react-router-dom'
import { SideBar } from '../SideBar'
import LanguageSwitcher from '../languageSwitcher/LanguageSwitcher'
import ThemeToggle from '../themeToggle/ThemeToggle'
import Navlink from '../Navlink/Navlink'
import UserMenu from '../UserMenu/UserMenu'
import useAuthStore from '@/store/useAuthStore'
import CartDrawer from '../CartDrawer/CartDrawer'
import { useTranslation } from 'react-i18next'

export default function Navbar() {

  const token = useAuthStore((state) => state.token);
  const isLoggedIn = !!token;

  const { t } = useTranslation("navbar");

  return (
    <>
      <div className='h-9 w-full bg-primary text-xs xxs:text-sm text-center font-medium text-primary-foreground tracking-[0.14px]'>
        <div class="container center">
            <span>{t("freeShipping")}</span>
        </div>
      </div>

      <header className="sticky top-0 z-50 h-20 bg-background shadow-md">
        <div className='container'>
          <div className='w-full h-full row gap-5 justify-between'>
            {/*Left side */}
            <div className='row gap-1.5 lg:gap-8'>
              {/* Logo */}
              <div className='center h-full order-2 lg:order-1'>
                <Link to="/" className='text-primary text-xl xxs:text-2xl xs:text-[28px] sm:text-[30px] font-bold tracking-[-0.32px]'>
                  Kashop
                </Link>
              </div>

              {/*navlinks +/ sidebar */}
              <div className='order-1 lg:order-2'>
                <div className='lg:hidden'>
                  <SideBar />
                </div>
                <div className='hidden lg:block'>
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
                <CartDrawer />
              ) : null}

              {/*Profile */}
              <div className='hidden lg:block'>
                <UserMenu />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
