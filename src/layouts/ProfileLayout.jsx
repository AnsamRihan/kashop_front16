import { FingerprintPattern, Folders } from 'lucide-react';
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, Outlet } from 'react-router-dom';

export default function ProfileLayout() {
    const { t } = useTranslation("profileLayout");
    return (
        <>
            <section className='p-10'>
                <div className="container">
                    <div className='w-full grid grid-cols-1 md:grid-cols-[1.75fr_4fr] gap-6'>
                        <div className='stack gap-1 w-full rounded-lg bg-secondary-background p-4 h-fit'>
                            <Link to="" className='w-full px-4 py-2 rounded-lg hover:bg-primary hover:text-primary-foreground
                            row transition-all duration-150 ease-in-out'>
                                <FingerprintPattern className='size-5' />
                                {t("profile")}
                            </Link>

                            <Link to="orders" className='w-full px-4 py-2 rounded-lg hover:bg-primary hover:text-primary-foreground
                            row transition-all duration-150 ease-in-out'>
                                <Folders className='size-5' />
                                {t("myOrders")}
                            </Link>
                        </div>

                        <Outlet />
                    </div>
                </div>
            </section>
        </>
    )
}
