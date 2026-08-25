import React, { useEffect } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";

import useCategories from "@/hooks/useCategories";
import CircularProgress from "@/components/CircularProgress/CircularProgress";
import ErrorFetchingData from "@/components/ErrorFetchingData.jsx/ErrorFetchingData";
import CategoriesFilters from "@/components/Categories/CategoriesFilter";
import ProductsInCategory from "@/components/Categories/ProductsInCategory";

export default function Categories() {
    const { t } = useTranslation("categories");

    const limit = 8;

    // URL is now the source of truth
    const [searchParams, setSearchParams] = useSearchParams();

    const categoryID = Number(searchParams.get("category")) || -1;

    const { data, isLoading, isError, error } = useCategories({
        limit,
    });

    const categories = data?.response?.data || [];

    // Find selected category
    const categoryName = categories.find(
        (category) => category.id === categoryID
    )?.name;

    /*
        If There is no category in the URL
        OR
        The category in the URL doesn't exist
        Select the first category.
    */
    useEffect(() => {
        if (!isLoading && !isError && categories.length > 0) {

            const categoryExists = categories.some(
                (category) => category.id === categoryID
            );

            if (!categoryExists) {
                setSearchParams({
                    category: String(categories[0].id),
                });
            }
        }
    }, [
        categories,
        categoryID,
        isLoading,
        isError,
        setSearchParams,
    ]);

    // Called when user selects another category
    const handleCategoryChange = (id) => {
        setSearchParams({
            category: String(id),
        });
    };

    return (
        <section className="py-8">
            <div className="container">
                <div className="stack items-start gap-6">

                    {/* Breadcrumb */}
                    <Breadcrumb className="text-[15px]">
                        <BreadcrumbList>

                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link to="/">
                                        {t("home")}
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbSeparator />

                            <BreadcrumbItem>
                                <BreadcrumbPage>
                                    {t("categories")}
                                </BreadcrumbPage>
                            </BreadcrumbItem>

                        </BreadcrumbList>
                    </Breadcrumb>


                    {/* Title */}
                    <div className="stack items-start gap-3 w-full">

                        <h1 className="pageHeader">
                            {t("categories")}
                        </h1>

                        <p className="pageDescription">
                            {t("description")}
                        </p>

                    </div>


                    {/* Loading */}
                    {isLoading && (
                        <CircularProgress />
                    )}


                    {/* Error */}
                    {isError && (
                        <ErrorFetchingData error={error} />
                    )}


                    {/* Content */}
                    {!isLoading && !isError && (
                        <CategoriesFilters
                            categoryName={
                                categoryID === -1
                                    ? "No Category"
                                    : categoryName
                            }
                            categories={categories}
                            categoryID={categoryID}
                            setCategoryID={handleCategoryChange}
                        >
                            <ProductsInCategory
                                categoryID={categoryID}
                            />
                        </CategoriesFilters>
                    )}

                </div>
            </div>
        </section>
    );
}