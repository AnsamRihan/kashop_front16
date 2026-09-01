import React from 'react'
import { useTranslation } from 'react-i18next'
import hero from "@/assets/images/aboutUs/aboutusBg.jpg";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function About() {
  const { t } = useTranslation("about");

  return (
    <>
      {/*hero */}
      <section className='pb-8'>
        <div className='bg-cover bg-center bg-no-repeat'
          style={{ backgroundImage: `url(${hero})` }}>
          <div className='container center text-center'>
            <div className='max-w-2xl stack items-center gap-5 py-30'>

              <h1 className='text-hero-heading-foreground font-semibold tracking-[-0.32px] text-3xl xxs:text-4xl xs:text-5xl'>
                {t("hero.title")}
              </h1>
              <p className='text-hero-foreground text-base xs:text-lg'>
                {t("hero.description")}
              </p>

              <Link to='/shop'>
                <Button variant='gradiant'>
                  {t("hero.button")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}