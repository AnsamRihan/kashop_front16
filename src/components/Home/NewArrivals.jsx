import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import useProducts from '@/hooks/useProducts';
import ProductCard from '../ProductCard/ProductCard';
import adBackgroundImage from './../../assets/images/home/AdBackgroundImage.png'
import ErrorFetchingData from '../ErrorFetchingData.jsx/ErrorFetchingData';
import CircularProgress from '../CircularProgress/CircularProgress';
import { Button } from '../ui/button';


export default function NewArrivals() {

    const { t } = useTranslation("home");
    const { data, isLoading, isError, error } = useProducts();

    return (
        <section className='pb-8'>
            <div className="container">
                <div className='w-full stack items-start gap-8'>
                    {/*Title area */}
                    <div className='w-full row justify-between '>
                        <h2 className='heading'>
                            {t("newArrivals.title")}
                        </h2>
                        <Link to='/shop' className='view-all-link'>
                            {t("viewAll")}
                        </Link>
                    </div>

                    <div className='w-full grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-6'>
                        {isLoading && (
                            <CircularProgress />
                        )}

                        {isError && (
                            <ErrorFetchingData error={error} />
                        )}

                        {!isLoading && !isError && (
                            <>
                                <div className='grid grid-cols-1 xxs:grid-cols-2 lg:grid-cols-3 gap-6'>
                                    {data.response.data.slice(0, 4).map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>

                                <div className='w-full h-full rounded-lg bg-no-repeat bg-cover bg-center p-6'
                                style={{ backgroundImage: `url(${adBackgroundImage})` }}>
                                    <div className='h-full center text-center'>
                                        <div className='stack gap-5'>
                                            <h3 className='text-hero-heading-foreground text-2xl xs:text-3xl md:text-4xl tracking-[-0.32px]
                                            font-semibold'>
                                                {t("newArrivals.circleTitle")}
                                            </h3>
                                            <p className='text-hero-foreground text-sm xs:text-base font-medium'>
                                                {t("newArrivals.circleDescription")}
                                            </p>
                                            <Button className='bg-hero-primary text-white'>
                                                {t("newArrivals.learnMore")}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
