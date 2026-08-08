import * as React from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { useTranslation } from "react-i18next"
import useProducts from "@/hooks/useProducts";
import CircularProgress from "../CircularProgress/CircularProgress";
import ErrorFetchingData from "../ErrorFetchingData.jsx/ErrorFetchingData";
import ProductCard from "../ProductCard/ProductCard";

export function ProductsCarousel() {

    const { i18n } = useTranslation();
    const { data, isLoading, isError, error } = useProducts();

    return ( 
    <>
        {isLoading && (
            <CircularProgress />
        )}

        {isError && (
            <ErrorFetchingData error={error} />
        )}

        {!isLoading && !isError && (
            <Carousel opts={{
                        align: "start",
                        loop: true,
                        direction: i18n.dir(),
                    }}
                className="w-full max-w-[68%] xs:max-w-[80%] sm:max-w-[85%] md:max-w-[88%] lg:max-w-[90%] xl:max-w-[93%]">

                    <CarouselContent>
                        {data.response.data.map((product) => (
                            <CarouselItem key={product.id} className="basis-1/1 xs:basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                                <ProductCard product={product} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
            </Carousel>
        )}
    </>
    )
}
