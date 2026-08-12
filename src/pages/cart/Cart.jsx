import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import useCart from '@/hooks/useCart';
import CircularProgress from '@/components/CircularProgress/CircularProgress';
import ErrorFetchingData from '@/components/ErrorFetchingData.jsx/ErrorFetchingData';
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody } from '@/components/ui/table';
import CartItem from '@/components/CartDrawer/CartItem';
import { Link } from 'react-router-dom';
import useClearCart from '@/hooks/useClearCart';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export default function Cart() {
  const { t } = useTranslation("cart")

  const { data, isLoading, isError, error } = useCart();
  const cartCount = data?.items.length || 0;

  const [showClearDialog, setShowClearDialog] = useState(false);

  const { mutate: clearCart, isPending: isClearing } = useClearCart();

  const handleClearCart = () => {
    clearCart(undefined, {
      onSuccess: () => {
        toast.success(t("cartCleared"));
        setShowClearDialog(false);
      },
      onError: (error) => {
        toast.error(
          error.response?.data?.message || t("failedToClearCart")
        );
      },
    });
  };

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
                {cartCount + " " + t("itemsInYourCart")}
              </p>
              <Button variant="ghost" className="text-red-600 row hover:text-red-500 hover:border hover:border-red-500"
                onClick={() => setShowClearDialog(true)} disabled={isClearing || cartCount === 0}>
                <Trash className='size-3' />
                {t("clearCart")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/*Cart Info */}
      <section className='pb-6'>
        <div className="container">
          <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/*Items */}
            <div className='md:col-span-2 rounded-lg bg-tertiary-background p-4 h-fit'>
              {data?.items?.length > 0 ? (
                <Table>
                  <TableBody>
                    {data.items.map((item) => (
                      <CartItem key={item.productId} item={item} />
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="p-4 center">
                  <p className="text-muted-foreground text-sm xs:text-base">
                    {t("noItemsInCart")}
                  </p>
                </div>
              )}
            </div>

            {/*Check out stuff */}
            <div className='bg-secondary-background rounded-lg px-4 py-6 h-fit'>
              <div className='w-full stack gap-4'>
                <div className='row justify-between w-full text-heading-foreground'>
                  <span className='capitalize text-sm xs:text-base font-medium'>
                    {t("subtotal")}
                  </span>
                  <span className='text-lg xs:text-xl font-semibold'>
                    ${data?.cartTotal.toFixed(2)}
                  </span>
                </div>
                <Button className="w-full">
                  {t("checkOut")}
                </Button>
                <Link to="/shop" className='w-full'>
                  <Button variant="outline" className="w-full">
                    {t("continueShopping")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog} >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t("areYouSure")}
            </AlertDialogTitle>

            <AlertDialogDescription>
              {t("clearCartDescription")}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>
              {t("cancel")}
            </AlertDialogCancel>

            <AlertDialogAction
              variant="destructive"
              onClick={handleClearCart}
              disabled={isClearing}
            >
              {isClearing ? t("clearing") : t("clearCart")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
