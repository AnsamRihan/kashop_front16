import React from 'react'
import { useTranslation } from 'react-i18next'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import useCart from '@/hooks/useCart';
import CircularProgress from '@/components/CircularProgress/CircularProgress';
import ErrorFetchingData from '@/components/ErrorFetchingData.jsx/ErrorFetchingData';
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Cart() {
  const { t } = useTranslation("cart")

  const { data, isLoading, isError, error } = useCart();
  const cartCount = data?.items.length || 0;

  if (isLoading) {
    return <CircularProgress />
  }

  if (isError) {
    return <ErrorFetchingData error={error} />
  }

  return (
    <>
      {/*Breadcrumb */}
      <section className='pt-8 pb-6'>
        <div className='container'>
          <Breadcrumb className='text-[15px]'>
            <BreadcrumbList>

              <BreadcrumbItem>
                <BreadcrumbLink href="/">{t("home")}</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbPage>{t("shoppingCart")}</BreadcrumbPage>
              </BreadcrumbItem>

            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Title */}
      <section className='pb-6'>
        <div className="container">
          <div className="stack items-start gap-3 w-full">
              <h1 className="pageHeader">
                  {t("shoppingCart")}
              </h1>

              <div className='row justify-between w-full'>
                <p className="pageDescription">
                    {cartCount+" "+t("itemsInYourCart")}
                </p>
                <Button variant="ghost" className="text-red-600 row hover:text-red-500 hover:border hover:border-red-500">
                  <Trash className='size-3' />
                  {t("clearCart")}
                </Button>
              </div>
          </div>
        </div>
      </section>

      
    </>
  )
}
