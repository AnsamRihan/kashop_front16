import CircularProgress from '@/components/CircularProgress/CircularProgress';
import ErrorFetchingData from '@/components/ErrorFetchingData.jsx/ErrorFetchingData';
import useProfile from '@/hooks/useProfile';
import React from 'react'
import { useTranslation } from 'react-i18next'
import PersonalInfo from '@/components/ProfileInfo/PersonalInfo';
import PasswordReset from '@/components/ProfileInfo/PasswordReset';

export default function ProfileInfo() {
    const { t } = useTranslation("profile");

    const { data, isLoading, isError, error } = useProfile();
    
    if (isLoading) {
        return <CircularProgress />
    }

    if (isError) {
        return <ErrorFetchingData error={error} />
    }

    return (
        <div className='stack items-start gap-5'>
            <h1 className='capitalize text-xl font-semibold text-heading-foreground'>
                {t("profile.settings")}
            </h1>

            <PersonalInfo data={data} />
            
            <PasswordReset data={data} />
        </div>
    )
}
