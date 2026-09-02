import React, { useEffect, useState } from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { useTranslation } from 'react-i18next';
import { Banknote, CreditCard } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import CircularProgress from '@/components/CircularProgress/CircularProgress';
import ErrorFetchingData from '@/components/ErrorFetchingData.jsx/ErrorFetchingData';
import { Table, TableBody } from '@/components/ui/table';
import useCart from '@/hooks/useCart';
import CartItemCheckout from '@/components/CartDrawer/CartItemCheckout';
import { Separator } from '@/components/ui/separator';
import useCheckout from '@/hooks/useCheckout';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

export default function Checkout() {

    const { t } = useTranslation("checkout");
    const [paymentMethod, setPaymentMethod] = useState("Visa");
    const { data, isLoading, isError, error } = useCart();
    const { mutate: checkout, isPending: isCheckingOut } = useCheckout();
    const navigate = useNavigate();

    const isCartEmpty = !data?.items?.length;

    useEffect(() => {
        if (!isLoading && !isError && isCartEmpty) {
            navigate("/cart");
        }
    }, [isLoading, isError, isCartEmpty, navigate]);

    const handleCheckout = () => {
        if (isCartEmpty) {
            toast.error(t("emptyCart"));
            return;
        }

        checkout(
            { PaymentMethod: paymentMethod },
            {
                onSuccess: (response) => {
                    if (paymentMethod === "Visa" && response?.data?.url) {
                        window.location.href = response.data.url;
                        return;
                    }
                    if (paymentMethod === "cash") {
                        navigate("/order-success");
                    }
                },
                onError: (error) => {
                    toast.error(error);
                },
            }
        );
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
                                <BreadcrumbLink href="/cart">{t("cart")}</BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbSeparator />

                            <BreadcrumbItem>
                                <BreadcrumbPage>{t("checkout")}</BreadcrumbPage>
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
                            {t("checkout")}
                        </h1>
                    </div>
                </div>
            </section>

            {/*Cart Info */}
            <section className='pb-6'>
                <div className="container">
                    <div className='w-full grid grid-cols-1 lg:grid-cols-12 gap-6'>
                        {/*payment method */}
                        <div className='lg:col-span-7 rounded-lg bg-tertiary-background p-6 h-fit'>
                            <div className='stack items-start gap-6'>
                                <div className='row'>
                                    <Banknote className='size-5.5 text-primary' />
                                    <h2 className='xs:text-lg text-heading-foreground font-semibold'>
                                        {t("paymentMethod")}
                                    </h2>
                                </div>

                                <RadioGroup className='grid grid-cols-1 sm:grid-cols-2 gap-4 w-full' value={paymentMethod}
                                    onValueChange={setPaymentMethod}>
                                    <div className='rounded-lg border-2 border-background-border bg-background h-full stack
                                    gap-3 p-5 has-data-checked:border-primary has-data-checked:bg-primary/5 items-start'>
                                        <div className='w-full row justify-between'>
                                            <CreditCard className='size-5.5 text-primary' />
                                            <RadioGroupItem value="Visa" id="Visa" className="border-2" />
                                        </div>
                                        <h3 className='text-heading-foreground'>
                                            {t("creditDebitCard")}
                                        </h3>
                                    </div>

                                    <div className='rounded-lg border-2 border-background-border bg-background h-full stack
                                    gap-3 p-5 has-data-checked:border-primary has-data-checked:bg-primary/5 items-start'>
                                        <div className='w-full row justify-between'>
                                            <Banknote className='size-5.5 text-primary' />
                                            <RadioGroupItem value="cash" id="cash" className="border-2" />
                                        </div>
                                        <h3 className='text-heading-foreground'>
                                            {t("cashOnDelivery")}
                                        </h3>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>

                        {/*payment items */}
                        <div className='lg:col-span-5 rounded-lg bg-tertiary-background p-6 h-fit'>
                            <div className='stack items-start gap-4 w-full'>
                                <h2 className='xs:text-lg text-heading-foreground font-semibold'>
                                    {t("orderSummary")}
                                </h2>

                                <Table>
                                    <TableBody>
                                        {data.items.map((item) => (
                                            <CartItemCheckout key={item.productId} item={item} />
                                        ))}
                                    </TableBody>
                                </Table>

                                <Separator />

                                <div className='w-full row justify-between'>
                                    <p className='text-heading-foreground font-semibold xs:text-lg'>
                                        {t("total")}
                                    </p>
                                    <span className='font-semibold'>
                                        ${data?.cartTotal.toFixed(2)}
                                    </span>
                                </div>

                                <Button className="w-full" onClick={handleCheckout}
                                    disabled={isCheckingOut || isCartEmpty}>
                                    {isCheckingOut ? t("processing") : t("placeOrder")}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}