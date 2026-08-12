import React from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTrigger,
} from "@/components/ui/drawer"
import useCart from '@/hooks/useCart';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { ShoppingCart, X } from 'lucide-react';
import { Badge } from '../ui/badge';
import CircularProgress from '../CircularProgress/CircularProgress';
import ErrorFetchingData from '../ErrorFetchingData.jsx/ErrorFetchingData';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { Table, TableBody } from '../ui/table';

export default function CartDrawer() {

    const { t, i18n } = useTranslation("cart");
    const direction = i18n.language === "ar" ? "left" : "right";

    const { data, isLoading, isError, error} = useCart();
    
    const cartCount = data?.items.length || 0;

    return (
        <Drawer swipeDirection={direction}>
            <DrawerTrigger 
            render={<Button variant="ghost" className="relative p-0 group">
                <ShoppingCart className="size-4 xxs:size-5 group-hover:text-primary"/>

                <Badge className="absolute -right-2 -top-1 size-4 rounded-full p-1 text-[7.5px] font-semibold">
                    {cartCount}
                </Badge>
            </Button>} />

            {isLoading && (
                <CircularProgress />
            )}

            {isError && (
                <ErrorFetchingData error={error} />
            )}

            {!isLoading && !isError && (
                <DrawerContent className='w-full min-[420px]:w-102.5 max-w-full'>
                    <DrawerHeader>
                        <div className="w-full row justify-between">
                            <div className='ps-2.5 center h-full'>
                                <span className='text-heading-foreground text-xl font-bold tracking-[-0.32px]'>
                                    {t("shoppingCart")}
                                </span>
                            </div>
                            <DrawerClose 
                            render={<Button variant="ghost" className='hover:text-primary'>
                                <X className="size-5" />
                            </Button>} />
                        </div>
                    </DrawerHeader>

                    <div className='flex-1 overflow-y-auto p-4'>
                        <Table>
                            <TableBody>
                                {data?.items?.map((item) => (
                                    <CartItem key={item.productId} item={item} />
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <DrawerFooter className='px-4 py-6 shadow-[0_0_1rem_#0003] border-t border-sidebar-input-border'>
                        <div className='w-full stack gap-2.5'>
                            <div className='row justify-between w-full'>
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
                            <Link to="/cart" className='w-full'>
                                <Button variant="outline" className="w-full">
                                    {t("viewShoppingCart")}
                                </Button>
                            </Link>
                        </div>
                    </DrawerFooter>
                </DrawerContent>
            )}
        </Drawer>
    )
}
