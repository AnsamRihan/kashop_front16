import useCategories from '@/hooks/useCategories';
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom';
import CircularProgress from '../CircularProgress/CircularProgress';
import ErrorFetchingData from '../ErrorFetchingData.jsx/ErrorFetchingData';

export default function Categories() {

    const { t } = useTranslation("home");
    const {data, isLoading, isError, error} = useCategories();
    if(isError){
        console.log("hello error : ", error);
    }
 
    return (
        <div className='pb-8'>
            <div className="container">
                <div className='w-full stack items-start gap-8'>
                    {/*Title area */}
                    <div className='w-full row justify-between '>
                        <h2 className='heading'>
                            {t("categories.title")}
                        </h2>
                        <Link to='/categories' className='view-all-link'>
                            {t("viewAll")}
                        </Link>
                    </div>

                    {isLoading && (
                        <CircularProgress />
                    )}

                    {isError && (
                        <ErrorFetchingData error={error}/>
                    )}

                    {!isLoading && !isError && (
                        <div className='w-full row gap-4 flex-wrap'>
                            <Link to='/shop' className='category'>
                                {t("categories.allProducts")}
                            </Link>
                            {data.response.data.map( (category) => (
                                <Link key={category.id} to={`/category?category=${category.id}`} 
                                className='category'>
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
