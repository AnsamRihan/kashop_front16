import CircularProgress from '@/components/CircularProgress/CircularProgress';
import ErrorFetchingData from '@/components/ErrorFetchingData.jsx/ErrorFetchingData';
import useProfile from '@/hooks/useProfile';
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function ProfileInfo() {
    const { t } = useTranslation();
    
    const { data, isLoading, isError, error } = useProfile();

    if(!isLoading && !isError){
        console.log(data)
    }

    return (
        <>
            {/*Personal Info */}
            <section className='w-full p-6 bg-tertiary-background rounded-lg border border-background-border
            stack items-start gap-6 pb-6'>
                 {isLoading && (
                    <CircularProgress />
                )}

                {isError && (
                    <ErrorFetchingData error={error} />
                )}

                {!isLoading && !isError && (
                    <>
                        <h2 className='text-primary font-semibold text-2xl xs:text-3xl tracking-[-0.32px] break-all'>
                            {t("personalInformation")}
                        </h2>

                        <div className='row justify-start gap-y-5 gap-x-8 sm:gap-x-15 flex-wrap'>
                            <div className='stack items-start gap-1'>
                                <h3 className='uppercase font-medium text-xs xs:text-sm tracking-[0.14px]'>
                                    {t("fullName")}
                                </h3>
                                <span className='text-heading-foreground text-base xs:text-lg break-all'>
                                    {data?.fullName}
                                </span>
                            </div>

                            <div className='stack items-start gap-1'>
                                <h3 className='uppercase font-medium text-xs xs:text-sm tracking-[0.14px]'>
                                    {t("email")}
                                </h3>
                                <span className='capitalize text-heading-foreground text-base xs:text-lg break-all'>
                                    {data?.email}
                                </span>
                            </div>

                            <div className='stack items-start gap-1'>
                                <h3 className='uppercase font-medium text-xs xs:text-sm tracking-[0.14px]'>
                                    {t("phoneNumber")}
                                </h3>
                                <span className='capitalize text-heading-foreground text-base xs:text-lg break-all'>
                                    {data?.phoneNumber}
                                </span>
                            </div>

                            <div className='stack items-start gap-1'>
                                <h3 className='uppercase font-medium text-xs xs:text-sm tracking-[0.14px]'>
                                    {t("city")}
                                </h3>
                                <span className='capitalize text-heading-foreground text-base xs:text-lg break-all'>
                                    {data?.city === null ? t("unknown") : data?.city }
                                </span>
                            </div>
                        </div>
                    </>
                )}
            </section>
        </>
    )
}
