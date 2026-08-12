import { TableCell, TableRow } from '../ui/table'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function CartItemCheckout({ item }) {
    const { t } = useTranslation("checkout");

    return (
        <>
            <TableRow>
                <TableCell className="stack min-w-0 items-start gap-0">
                    <Link to={`/product/${item.productId}`} className='text-heading-foreground font-semibold xs:text-lg'>
                        {item.productName}
                    </Link>
                    <span className='text-sm xs:text-base font-semibold'>
                        ${item.price}
                    </span>
                    <p className='text-xs xs:text-sm text-muted-foreground'>
                        {t("QTY")}: {item.count}
                    </p>
                    
                </TableCell>
                <TableCell className='w-0 p-1'>
                    <p className='text-sm xs:text-base text-heading-foreground font-semibold'>
                        ${item.totalPrice}
                    </p>
                </TableCell>
            </TableRow>
        </>
        
    )
}
