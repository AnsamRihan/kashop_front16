import CircularProgress from '@/components/CircularProgress/CircularProgress'
import ErrorFetchingData from '@/components/ErrorFetchingData.jsx/ErrorFetchingData'
import Pagination from '@/components/Pagination/Pagination'
import ProductCard from '@/components/ProductCard/ProductCard'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import useProducts from '@/hooks/useProducts'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { productSortOptions } from '@/constants/productSortOptions'
import { productSortItems } from '@/constants/productSortItems'

export default function Products() {
  const { t } = useTranslation("products");

  const items = [
    { label: "Sort By:", value: null },
    { label: "Alphabetically, A-Z", value: "az" },
    { label: "Alphabetically, Z-A", value: "za" },
    { label: "Price, low to high", value: "priceLowToHigh" },
    { label: "Price, high to low", value: "priceHighToLow" },
    { label: "Rate, low to high", value: "rateLowToHigh" },
    { label: "Rate, high to low", value: "rateHighToLow" },
  ]

  const [sortBy, setSortBy] = useState("az");
  const [page, setPage] = useState(1);
  const selectedSort = productSortOptions[sortBy];
  const limit = 8;

  const { data, isLoading, isError, error } = useProducts({
      page,
      limit: limit,
      sortBy: selectedSort.sortBy,
      ascending: selectedSort.ascending,
  });

  const totalCount = data?.response?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <section className='py-8'>
      <div className='container'>
        <div className='stack items-start gap-6'>
          {/*Breadcrumb */}
          <Breadcrumb className='text-[15px]'>
            <BreadcrumbList>

              <BreadcrumbItem>
                <BreadcrumbLink href="/">{t("home")}</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbPage>{t("shop")}</BreadcrumbPage>
              </BreadcrumbItem>

            </BreadcrumbList>
          </Breadcrumb>

          {/*Title */}
          <div className='stack items-start gap-3 w-full'>
            <h1 className='capitalize text-heading-foreground font-bold text-3xl xs:text-4xl md:text-5xl tracking-[-0.96px]'>
              {t("shop")}
            </h1>
            <p className='text-sm xs:text-base md:text-lg'>
              {t("description")}
            </p>
          </div>

          <div className='stack gap-3 w-full'>
            <Separator />

            {/*Filter Area */}
            <div className='center justify-between w-full'>
              <p className='text-xs xxs:text-sm'>
                {!isLoading && !isError && data?.response ? (
                  <span className='font-bold text-heading-foreground'>
                    {data.response.totalCount}
                  </span>
                ):(
                  <span className='font-bold text-heading-foreground'>
                    {t("no")}
                  </span>
                )}
                {" "}{t("productsFound")}
              </p>

              <div className='row gap-6'>

                <div className='row'>
                  <span className='capitalize text-xs xxs:text-sm hidden md:block'>
                    {t("sortBy")}
                  </span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48 text-xs xxs:text-sm bg-secondary-background">
                      <SelectValue>
                        {t(
                          productSortItems.find(
                            (item) => item.value === sortBy
                          )?.translationKey
                        )}
                      </SelectValue>
                    </SelectTrigger>

                    <SelectContent className="w-48">
                      <SelectGroup>
                        {productSortItems.map((item) => (
                          <SelectItem
                            key={item.value}
                            value={item.value}
                            className="text-xs xxs:text-sm"
                          >
                            {t(item.translationKey)}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />
          </div>
          
          {isLoading && (
            <CircularProgress />
          )}

          {isError && (
            <ErrorFetchingData error={error} />
          )}

          {/*Products */}
          {!isLoading && !isError && (
            <>
              <div className='grid grid-cols-1 xxs:grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6'>
                {data.response.data.map( (product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              <Pagination page={page} totalPages={totalPages} onPageChange={setPage}/>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
