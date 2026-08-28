import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { useTranslation } from 'react-i18next'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import i18n from '@/i18next'
import heroImage1 from './../../assets/images/home/HeroCarousel1.png'
import heroImage2 from './../../assets/images/home/HeroCarousel2.png'
import Autoplay from "embla-carousel-autoplay"

export default function Hero() {

    const { t } = useTranslation("home");

    return (
        <section className='h-[calc(100vh-80px)] w-full mb-8'>
            <Carousel opts={{align: "start", loop: true, direction: i18n.dir()}}
                plugins={[ Autoplay({ delay: 4000, }), ]}
                className="w-full h-full">
                <CarouselContent className='h-[calc(100vh-80px)]'>
                    <CarouselItem className='h-full'>
                        <div className="relative w-full h-full overflow-hidden">
                            {/* Hero image */}
                            <div
                                className={`absolute inset-0 bg-no-repeat bg-cover bg-bottom ${i18n.language === "ar" ? "scale-x-[-1]" : ""
                                    }`}
                                style={{ backgroundImage: `url(${heroImage1})` }}
                            />

                            {/* Hero content */}
                            <div className="relative z-10 h-full">
                                <div className="container h-full">
                                    <div className="h-full p-6 stack items-start justify-center">
                                        <div className="stack gap-5.5 items-start max-w-135">
                                            <span className="uppercase text-hero-primary font-bold text-sm tracking-[1.4px]">
                                                {t("hero.summerSale")}
                                            </span>

                                            <h1 className="text-4xl md:text-5xl font-bold text-hero-heading-foreground tracking-[-0.96px]">
                                                {t("hero.summerTitle")}{" "}
                                                <span className="text-hero-primary">
                                                    {t("hero.summerTitlePrimary")}
                                                </span>
                                                .
                                            </h1>

                                            <p className="text-hero-foreground font-medium text-sm md:text-base">
                                                {t("hero.summerDescription")}
                                            </p>

                                            <Link to="/shop">
                                                <Button className="bg-hero-primary text-white">
                                                    {t("hero.shopThisSale")}
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>

                    <CarouselItem className='h-full'>
                        <div className="relative w-full h-full overflow-hidden">
                            {/* Hero image */}
                            <div
                                className={`absolute inset-0 bg-no-repeat bg-cover bg-bottom ${i18n.language === "ar" ? "scale-x-[-1]" : ""
                                    }`}
                                style={{ backgroundImage: `url(${heroImage2})` }}
                            />

                            {/* Hero content */}
                            <div className="relative z-10 h-full">
                                <div className="container h-full">
                                    <div className="h-full p-6 stack items-start justify-center">
                                        <div className="stack gap-5.5 items-start max-w-135">
                                            <span className="uppercase text-hero-primary font-bold text-sm tracking-[1.4px]">
                                                {t("hero.newArrival")}
                                            </span>

                                            <h1 className="text-4xl md:text-5xl font-bold text-hero-heading-foreground tracking-[-0.96px]">
                                                {t("hero.newArrivalTitle")}
                                            </h1>

                                            <p className="text-hero-foreground font-medium text-sm md:text-base">
                                                {t("hero.newArrivalDescription")}
                                            </p>

                                            <Link to="/shop">
                                                <Button className="bg-hero-primary text-white">
                                                    {t("hero.shopCollection")}
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                </CarouselContent>

                <CarouselPrevious className="inset-s-1 xs:inset-s-2 lg:inset-s-3 bg-background/80" />
                <CarouselNext className="inset-e-1 xs:inset-e-2 lg:inset-e-3 bg-background/80" />
            </Carousel>
        </section>
    )
}
