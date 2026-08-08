import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ProductsCarousel } from './ProductsCarousel';

export default function Products() {

    const { t } = useTranslation("home");

    return (
        <section className='pb-8'>
            <div className="container">
                <div className='w-full stack items-start gap-8'>
                    {/*Title area */}
                    <div className='w-full row justify-between '>
                        <h2 className='heading'>
                            {t("products.title")}
                        </h2>
                        <Link to='/shop' className='view-all-link'>
                            {t("viewAll")}
                        </Link>
                    </div>

                    <div className='w-full center'>
                        <ProductsCarousel />
                    </div>
                </div>
            </div>
        </section>
    )
}
