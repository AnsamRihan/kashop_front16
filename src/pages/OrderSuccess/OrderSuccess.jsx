import { Button } from '@/components/ui/button';
import { CircleCheck } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom';

export default function OrderSuccess() {
    const { t } = useTranslation("orderSuccess");
    const navigate = useNavigate();
    return (
        <section className='py-8'>
            <div className="container">
                <div className='w-full h-full center'>
                    <div className='stack '>
                        <div className='w-20 h-20 circle bg-primary/20 center'>
                            <CircleCheck className='size-10 text-primary' />
                        </div>
                        <h1 className='text-heading-foreground text-2xl xs:text-3xl font-semibold tracking-[-0.32px] pt-4'>
                            {t("OrderPlacedSuccessfully")}
                        </h1>
                        <p className='text-xs xs:text-sm max-w-[585px]'>
                            {t("ThankYou")}
                        </p>

                        <Button onClick={() => navigate("/shop")} className="mt-3">
                            {t("continueShopping")}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
