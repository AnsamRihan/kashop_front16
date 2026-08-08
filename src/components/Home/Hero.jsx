import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { useTranslation } from 'react-i18next'

export default function Hero() {

    const { t } = useTranslation("home");

    return (
        <section className='my-8'>
            <div className="container">
                <div className='w-full bg-secondary-background p-8 rounded-[24px] center'>
                    <div className=' stack gap-5 text-center max-w-167.75'>
                        <h1 className='text-heading-foreground font-bold text-2xl xs:text-[27px] sm:text-3xl md:text-[30px] lg:text-4xl xl:text-[42px]'>
                            {t("hero.title")}
                        </h1>

                        <p className='max-w-137.75 text-xs xs:text-sm md:text-base'>
                            {t("hero.description")}
                        </p>

                        <div className='w-full sm:w-fit pt-4 stack gap-2 sm:row sm:gap-4'>
                            <Link to='/shop' className='w-full'>
                                <Button variant='gradiant' className='capitalize w-full'>
                                    {t("hero.shopNow")}
                                </Button>
                            </Link>

                            <Link to='/categories' className='w-full'>
                                <Button variant='outline' className='capitalize w-full'>
                                    {t("hero.exploreCategories")}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
