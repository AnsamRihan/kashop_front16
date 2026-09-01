import React from 'react'
import { useTranslation } from 'react-i18next'
import hero from "@/assets/images/aboutUs/aboutusBg.jpg";
import aboutStore from "@/assets/images/aboutUs/aboutStore.jpg";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function About() {
  const { t } = useTranslation("about");

  return (
    <>
      {/*hero */}
      <section className='pb-12'>
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

      {/*More than just a store section */}
      <section className='pb-12'>
        <div className="container">
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-12'>
            <div className='overflow-hidden rounded-[16px]'>
              <img
                src={aboutStore}
                alt={t("moreThanStore.imageAlt")}
                className='h-125 w-full object-cover object-center rounded-[16px] transition-transform duration-500 hover:scale-105'
              />
            </div>

            <div className='stack items-start justify-center gap-4'>
              <h2 className='text-heading-foreground font-semibold tracking-[-0.32px] text-lg xxs:text-2xl xs:text-3xl'>
                {t("moreThanStore.title")}
              </h2>

              <p className='max-w-125'>
                {t("moreThanStore.description")}
              </p>

              <Link
                to='/about'
                className='row justify-center text-primary font-medium text-sm group'
              >
                <span>
                  {t("moreThanStore.link")}
                </span>
                <ArrowRight className="size-4 mt-0.75 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}