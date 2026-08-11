import CircularProgress from '@/components/CircularProgress/CircularProgress'
import ErrorFetchingData from '@/components/ErrorFetchingData.jsx/ErrorFetchingData'
import Pagination from '@/components/Pagination/Pagination'
import ProductCard from '@/components/ProductCard/ProductCard'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import useProducts from '@/hooks/useProducts'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { productSortOptions } from '@/constants/productSortOptions'
import Filters from '@/components/Products/ProductsFilter'

export default function Products() {
  const { t } = useTranslation("products");

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
            <h1 className='pageHeader'>
              {t("shop")}
            </h1>
            <p className='pageDescription'>
              {t("description")}
            </p>
          </div>

          <Filters 
            totalCount={data?.response?.totalCount ?? 0}
            sortBy={sortBy}
            setSortBy={setSortBy}
            isLoading={isLoading}
            isError={isError}
          />
          
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
