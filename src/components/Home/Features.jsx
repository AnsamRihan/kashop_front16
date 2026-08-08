import { Banknote, CircleCheckBig, Truck } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Features() {

    const { t } = useTranslation("home");

    return (
        <div className='mb-8'>
            <div className="container">
                <div className='bg-secondary-background/80 rounded-lg p-8 center gap-6 lg:gap-12 xl:gap-16 flex-wrap text-center'>
                    <div className='p-4 lg:p-8 stack gap-3.75'>
                        <div className='center p-4.75 bg-primary/10 text-primary rounded-lg'>
                            <CircleCheckBig />
                        </div>
                        <h2 className='text-heading-foreground'>
                            {t("features.simpleShopping.title")}
                        </h2>
                        <p className='font-medium text-sm max-w-68.5'>
                            {t("features.simpleShopping.description")}
                        </p>
                    </div>

                    <div className='p-4 lg:p-8 stack gap-3.75'>
                        <div className='center p-4.75 bg-primary/10 text-primary rounded-lg'>
                            <Banknote className='size-7' />
                        </div>
                        <h2 className='text-heading-foreground'>
                            {t("features.flexiblePayments.title")}
                        </h2>
                        <p className='font-medium text-sm max-w-68.5'>
                            {t("features.flexiblePayments.description")}
                        </p>
                    </div>

                    <div className='p-4 lg:p-8 stack gap-3.75'>
                        <div className='center p-4.75 bg-primary/10 text-primary rounded-lg'>
                            <Truck className='size-7' />
                        </div>
                        <h2 className='text-heading-foreground'>
                            {t("features.expressDelivery.title")}
                        </h2>
                        <p className='font-medium text-sm max-w-68.5'>
                            {t("features.expressDelivery.description")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
