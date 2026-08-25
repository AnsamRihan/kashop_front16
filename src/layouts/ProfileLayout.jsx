import CircularProgress from '@/components/CircularProgress/CircularProgress';
import ErrorFetchingData from '@/components/ErrorFetchingData.jsx/ErrorFetchingData';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import useProfile from '@/hooks/useProfile';
import useUserStore from '@/store/useUserStore';
import { FingerprintPattern, Folders } from 'lucide-react';
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink, Outlet } from 'react-router-dom';

export default function ProfileLayout() {
    const { t } = useTranslation("profileLayout");
    const { isLoading, isError, error } = useProfile();
    const user = useUserStore((set) => set.user);

    return (
        <>
            <div className='py-10'>
                <div className="container">
                    <div className='w-full grid grid-cols-1 md:grid-cols-[1.75fr_4fr] lg:grid-cols-[1.5fr_4fr] xl:grid-cols-[1.35fr_4fr] 2xl:grid-cols-[1.25fr_4fr] gap-6'>
                        <div className='stack gap-1 w-full rounded-lg bg-secondary-background p-3 h-fit'>

                            <div className="flex h-auto w-full justify-start gap-3 p-2 text-foreground mb-2">

                                {isLoading && (
                                    <CircularProgress />
                                )}

                                {isError && (
                                    <ErrorFetchingData error={error} />
                                )}

                                {!isLoading && !isError && user && (
                                    <>
                                        <Avatar className="h-10 w-10 circle">
                                            <AvatarFallback className="circle bg-primary text-primary-foreground">
                                                {user.fullName?.slice(0, 2).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="grid min-w-0 flex-1 text-start text-sm lg:text-base leading-tight">
                                            <span className="truncate font-semibold text-primary">
                                                {user.fullName}
                                            </span>

                                            <span className="truncate text-xs text-muted-foreground">
                                                {user.email}
                                            </span>
                                        </div>
                                    </>
                                )}
                            </div>

                            <NavLink to="" end
                                className={({ isActive }) =>
                                    `w-full px-4 py-2 rounded-lg row transition-all duration-150 ease-in-out text-sm lg:text-base
                                    ${isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "hover:bg-primary hover:text-primary-foreground"
                                    }`
                                } >
                                <FingerprintPattern className="size-4 lg:size-5" />
                                {t("profile")}
                            </NavLink>

                            <NavLink to="orders"
                                className={({ isActive }) =>
                                    `w-full px-4 py-2 rounded-lg row transition-all duration-150 ease-in-out text-sm lg:text-base
                                    ${isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "hover:bg-primary hover:text-primary-foreground"
                                    }`
                                } >
                                <Folders className="size-4 lg:size-5" />
                                {t("myOrders")}
                            </NavLink>
                        </div>

                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}
