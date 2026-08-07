import React from 'react'
import { Link } from 'react-router-dom'
import { footerLinks } from "@/constants/footerLinks"
import { useTranslation } from 'react-i18next'

export default function Footer() {

  const { t } = useTranslation("footer");

  return (
    <footer className='py-8 bg-secondary-background border-t border-background-border'>
      <div className="container stack gap-6 md:row md:justify-between md:gap-5">
        {/*Left Side */}
        <div className='stack md:items-start gap-1'>
          <Link to="/" className='text-primary text-xl font-bold tracking-[-0.32px]'>
              Kashop
          </Link>

          <p className='text-xs xs:text-sm font-medium text-center md:text-start'>
            {t("footerRights")}
          </p>
        </div>

        {/*Right Side */}
        <div className='w-full md:w-fit'>
          <ul className='w-full md:w-fit row justify-between flex-wrap text-start gap-6'>
            {footerLinks.map( (link) => 
              <li key={link.key} className='footer-link'>
                <Link to={link.path}>{t(`footerLinks.${link.key}`)}</Link>
              </li>
             )}
          </ul>
        </div>
      </div>
    </footer>
  )
}
