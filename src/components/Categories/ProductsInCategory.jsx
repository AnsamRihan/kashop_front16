import useProductsByCategory from '@/hooks/useProductsByCategory'
import React from 'react'
import CircularProgress from '../CircularProgress/CircularProgress';
import ErrorFetchingData from '../ErrorFetchingData.jsx/ErrorFetchingData';
import ProductCard from '../ProductCard/ProductCard';

export default function ProductsInCategory({ categoryID }) {

    const {data, isLoading, isError, error} = useProductsByCategory({
        categoryID
    });

    if(!isLoading && !isError){
        console.log(data.response)
    }

    return (
       <>
        {isLoading && (
            <CircularProgress />
        )}

        {isError && (
            <ErrorFetchingData error={error} />
        )}

        {!isError && !isLoading && (
            data?.response?.length === 0 ? (
                <div className='h-full w-full center text-heading-foreground font-semibold'>
                    No products in this category
                </div>
            ) : (
                <div className='grid grid-cols-1 xxs:grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
                    {data.response.map( (product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )
        )}
       </>
    )
}
