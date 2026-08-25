import CircularProgress from '@/components/CircularProgress/CircularProgress';
import ErrorFetchingData from '@/components/ErrorFetchingData.jsx/ErrorFetchingData';
import useProfile from '@/hooks/useProfile';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';

export default function OrdersInfo() {

  const { t } = useTranslation("orders");

  const { data, isLoading, isError, error } = useProfile();
  const [numberOfOrders, setNumberOfOrders] = useState(20);

  if (isLoading) {
    return <CircularProgress />
  }

  if (isError) {
    return <ErrorFetchingData error={error} />
  }

  if (!isLoading && !isError) {
    console.log(data);
  }

  return (
    <div className='stack items-start gap-5'>
      <h1 className='capitalize text-xl font-semibold text-heading-foreground'>
        {t("myOrders")} {" "} ({data?.orders.length})
      </h1>

      {/*Orders Table */}
      <section className='w-full stack gap-4'>
        <div className='w-full rounded-lg border bg-primary/5'>
          <Table className='text-center'>
            <TableHeader>
              <TableRow>
                <TableHead className='text-center font-semibold'>{t("orderId")}</TableHead>
                <TableHead className='text-center font-semibold w-60'>{t("date")}</TableHead>
                <TableHead className='text-center font-semibold'>{t("amount")}</TableHead>
                <TableHead className='text-center font-semibold'>{t("status")}</TableHead>
                <TableHead className='text-center font-semibold'>{t("payment")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.orders.slice(0, numberOfOrders).map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-semibold">#{order.id}</TableCell>
                  <TableCell>
                    {new Date(order.orderDate).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell className='font-medium'>${order.amountPaid}</TableCell>
                  <TableCell>
                    {order.status}
                  </TableCell>
                  <TableCell className='text-primary font-medium'>
                    {order.paymentStatus === null ? t("pending") : order.paymentStatus}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Button variant='outline' className="w-full" onClick={() => setNumberOfOrders((prev) => prev + 20)}
          disabled={numberOfOrders >= data.orders.length}>
          {t("loadMoreOrders")}
        </Button>
      </section>
    </div>
  )
}
