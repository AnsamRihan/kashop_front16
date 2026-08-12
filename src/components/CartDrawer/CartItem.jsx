import React, { useState } from 'react'
import { TableCell, TableRow } from '../ui/table'
import { X } from 'lucide-react'
import useRemoveFromCart from '@/hooks/useRemoveFromCart'
import { toast } from 'sonner'
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
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import useUpdateQuantity from '@/hooks/useUpdateQuantity'
import QuantitySelector from '../QuantitySelector/QuantitySelector'

export default function CartItem({ item }) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const { mutate: removeCartItem, isPending } = useRemoveFromCart();
    const { t } = useTranslation("cartItem");
    const {mutate:updateQuantity, isPending:updateQuantityIsPending} = useUpdateQuantity()

    const handleRemove = () => {
        removeCartItem(
            { productId: item.productId },
            {
                onSuccess: () => {
                    toast.success(t("itemRemovedFromCart"));
                },
                onError: (error) => {
                    toast.error(
                        error.response?.data?.message ||
                        t("failedToRemoveItemFromCart")
                    );
                },
            }
        );
    };

    const handleQuantityChange = (newQuantity) => {
        updateQuantity(
            {
                productId: item.productId,
                count: newQuantity,
            },
            {
                onSuccess: () => {
                    toast.success(t("quantityUpdated"));
                },
                onError: (error) => {
                    toast.error(
                        error.response?.data?.message ||
                        t("failedToUpdateQuantity")
                    );
                },
            }
        );
    };

    return (
        <>
            <TableRow>
                <TableCell className='w-0 p-1'>
                    <button disabled={isPending} onClick={() => setShowDeleteDialog(true)}>
                        <X className='size-4' />
                    </button>
                </TableCell>
                <TableCell className="stack min-w-0 items-start gap-0">
                    <span className='text-xs xs:text-sm'>
                        ${item.price}
                    </span>
                    <Link to={`/product/${item.productId}`} className='text-heading-foreground font-semibold xs:text-lg'>
                        {item.productName}
                    </Link>
                    <p className='text-xs xs:text-sm text-muted-foreground'>
                        {t("total")}: ${item.totalPrice}
                    </p>
                </TableCell>
                <TableCell className='w-0 p-1'>
                    <div className='h-full'>
                        <QuantitySelector 
                            quantity={item.count}
                            onQuantityChange={handleQuantityChange}
                            textClassName="text-xs"
                            iconSize='size-3'
                            size='size-7'
                        />
                    </div>
                </TableCell>
            </TableRow>

            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog} >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                        {t("areYouSure")}
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                            {t("removeCartItemDescription")}
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>
                            {t("cancel")}
                        </AlertDialogCancel>

                        <AlertDialogAction
                            variant="destructive"
                            onClick={handleRemove}
                            disabled={isPending}
                        >
                            {isPending ? t("removing") : t("remove")}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
        
    )
}
