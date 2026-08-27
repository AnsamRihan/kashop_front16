import useCategories from "@/hooks/useCategories";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import CircularProgress from "../CircularProgress/CircularProgress";
import ErrorFetchingData from "../ErrorFetchingData.jsx/ErrorFetchingData";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export default function Categories() {
    const { t, i18n } = useTranslation("home");

    const {
        data,
        isLoading,
        isError,
        error,
    } = useCategories();

    if (isError) {
        console.log("Categories error:", error);
    }

    const categories = data?.response?.data || [];

    return (
        <section className="pb-8">
            <div className="container">
                <div className="w-full stack items-start gap-8">

                    {/* Title */}
                    <div className="w-full row justify-between">
                        <h2 className="heading">
                            {t("categories.title")}
                        </h2>

                        <Link
                            to="/categories"
                            className="view-all-link"
                        >
                            {t("viewAll")}
                        </Link>
                    </div>

                    {/* Loading */}
                    {isLoading && (
                        <CircularProgress />
                    )}

                    {/* Error */}
                    {isError && (
                        <ErrorFetchingData error={error} />
                    )}

                    {/* Categories */}
                    {!isLoading && !isError && (
                        <div className='w-full center text-center'>
                            <Carousel opts={{
                                align: "start",
                                loop: true,
                                direction: i18n.dir(),
                            }}
                                className="w-full max-w-[68%] xs:max-w-[80%] sm:max-w-[85%] md:max-w-[88%] lg:max-w-[90%] xl:max-w-[93%]">

                                <CarouselContent>
                                    {categories.map((category) => (
                                        <CarouselItem key={category.id} className="basis-1/1 xs:basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
                                            <Link to={`/categories?category=${category.id}`} className="category">
                                                {category.name}
                                            </Link>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
}