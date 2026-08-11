import React, { useEffect, useState } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useTranslation } from "react-i18next";
import useCategories from "@/hooks/useCategories";
import CircularProgress from "@/components/CircularProgress/CircularProgress";
import ErrorFetchingData from "@/components/ErrorFetchingData.jsx/ErrorFetchingData";
import CategoriesFilters from "@/components/Categories/CategoriesFilter";
import ProductsInCategory from "@/components/Categories/ProductsInCategory";

export default function Categories() {
    const { t } = useTranslation("categories");

    const limit = 8;

    const [categoryID, setCategoryID] = useState(() => {
        const saved = localStorage.getItem("selectedCategory");

        return saved ? Number(saved) : -1;
    });

    const { data, isLoading, isError, error } = useCategories({
        limit,
    });

    useEffect(() => {
        if (categoryID !== -1) {
            localStorage.setItem("selectedCategory", String(categoryID));
        }
    }, [categoryID]);

    useEffect(() => {
        if (!isLoading && !isError && data?.response?.data?.length) {
            const categories = data.response.data;

            const categoryExists = categories.some(
                (category) => category.id === categoryID
            );

            if (!categoryExists) {
                setCategoryID(categories[0].id);
            }
        }
    }, [data, isLoading, isError, categoryID]);

    const categoryName = data?.response?.data?.find(
        (category) => category.id === categoryID
    )?.name;

    return (
        <section className="py-8">
            <div className="container">
                <div className="stack items-start gap-6">

                    {/* Breadcrumb */}
                    <Breadcrumb className="text-[15px]">
                        <BreadcrumbList>

                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">
                                    {t("home")}
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
                    {isLoading && <CircularProgress />}

                    {/* Error */}
                    {isError && <ErrorFetchingData error={error} />}

                    {/* Content */}
                    {!isLoading && !isError && (
                        /* Mobile category + sort */
                        <CategoriesFilters
                            categoryName={
                                categoryID === -1
                                    ? "No Category"
                                    : categoryName
                            }
                            categories={data?.response?.data}
                            categoryID={categoryID}
                            setCategoryID={setCategoryID}
                        >
                            <ProductsInCategory categoryID={categoryID} />
                        </CategoriesFilters>
                    )}
                </div>
            </div>
        </section>
    );
}