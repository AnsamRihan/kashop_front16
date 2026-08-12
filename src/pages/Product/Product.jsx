import CircularProgress from '@/components/CircularProgress/CircularProgress';
import ErrorFetchingData from '@/components/ErrorFetchingData.jsx/ErrorFetchingData';
import QuantitySelector from '@/components/QuantitySelector/QuantitySelector';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import useAddToCart from '@/hooks/useAddToCart';
import usePostReview from '@/hooks/usePostReview';
import useProduct from '@/hooks/useProduct';
import { BadgeCheck, ShoppingCart, Star } from 'lucide-react';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom'
import { toast } from "sonner";

export default function Product() {

    const { mutate: addToCart } = useAddToCart();
    const { t } = useTranslation("product");

    const { id } = useParams();
    const productID = Number(id);
    const { data, isLoading, isError, error } = useProduct({
        productID
    })

    const subImages = data?.response?.subImages ?? [];

    const displayedSubImages = subImages.slice(0, 5);
    const remainingSubImages = Math.max(subImages.length - 5, 0);
    const buttonEnables = data?.response?.quantity > 0;
    const [quantity, setQuantity] = useState(1);
    const [showMore, setShowMore] = useState(false);
    const description = data?.response?.description ?? "";
    const truncateAt = 350;
    const shouldTruncate = description.length > truncateAt;
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");

    const {mutate: postReview,isPending} = usePostReview();
    const [numberOfReviews, setNumberOfReviews] = useState(2);

    const handleSubmitReview = () => {
        if (!rating || !review.trim()) return;

        postReview({
            productID,
            Rating: rating,
            Comment: review.trim(),
        },
        {
            onSuccess: () => {
                setRating(0);
                setReview("");
            },
            onError: (error) => {
                toast.error(
                    error.response?.data?.message || "Failed to submit review"
                );
            },
        });
    };

    if (isLoading) {
        return <CircularProgress />
    }

    if (isError) {
        return <ErrorFetchingData error={error} />
    }

    return (
        <>
            {/*Breadcrumb */}
            <section className='py-8'>
                <div className='container'>
                    <Breadcrumb className='text-[15px]'>
                        <BreadcrumbList>

                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">{t("home")}</BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbSeparator />

                            <BreadcrumbItem>
                                <BreadcrumbLink href="/shop">{t("products")}</BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbSeparator />

                            <BreadcrumbItem>
                                <BreadcrumbPage>{data.response.name}</BreadcrumbPage>
                            </BreadcrumbItem>

                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </section>

            {/*Product Section */}
            <section className='pb-8'>
                <div className='container'>
                    <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 lg:gap-16'>
                        {/*Images div */}
                        <div className='w-full stack items-start gap-4'>
                            <div className="w-full overflow-clip rounded-lg">
                                <img src={data.response.image} alt={data.response.name} className="aspect-square w-full
                                    transition-transform duration-500 ease-out hover:scale-105"/>
                            </div>
                            <div className='grid grid-cols-5 gap-4'>
                                {displayedSubImages.map((image, index) => {
                                    const showOverlay =
                                        index === 5 && remainingImages > 0;

                                    return (
                                        <div key={image} className="relative aspect-square overflow-hidden rounded-lg
                                            transition-all duration-100 ease-out hover:border-2 hover:border-primary">

                                            <img src={image} alt={data?.response?.title} className="w-full aspect-square object-cover" />

                                            {showOverlay && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 group">
                                                    <span className="text-xl font-medium text-white transition-all duration-100 ease-in-out group-hover:text-3xl">
                                                        +{remainingSubImages}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/*Product Info */}
                        <div className='stack items-start gap-5'>
                            {/*Name & Rating */}
                            <div className='stack items-start'>
                                <h1 className='text-heading-foreground text-2xl xs:text-3xl font-semibold tracking-[-0.32px]'>
                                    {data?.response?.name}
                                </h1>
                                {/*Rating */}
                                <div className="row gap-1">
                                    <div className="row gap-0">
                                        {Array.from({ length: Math.floor(data?.response?.rate) }, (_, i) => (
                                            <Star key={i} className="size-5 text-primary" fill="currentColor" strokeWidth={0} />
                                        ))}
                                    </div>
                                    <span className="font-medium text-base">
                                        {data?.response?.rate.toFixed(1)}
                                    </span>
                                </div>
                            </div>

                            <span className='text-primary text-2xl xs:text-3xl font-semibold tracking-[-0.32px]'>
                                ${data?.response?.price.toFixed(2)}
                            </span>

                            <div>
                                <p className="text-sm">
                                    {showMore || !shouldTruncate
                                        ? description
                                        : `${description.slice(0, truncateAt)}...`}
                                </p>

                                {shouldTruncate && (
                                    <button
                                        type="button"
                                        onClick={() => setShowMore((prev) => !prev)}
                                        className="mt-1 text-xs font-semibold text-primary hover:underline"
                                    >
                                        {showMore ? "See less" : "See more"}
                                    </button>
                                )}
                            </div>

                            <div className='row w-full gap-1.5'>
                                {data?.response?.quantity > 0 ? (
                                    <>
                                        <div className='w-2 h-2 circle bg-green-500'></div>
                                        <p className='text-sm font-semibold tracking-[0.14px]'>
                                            {t("inStock")}
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <div className='w-2 h-2 circle bg-red-500'></div>
                                        <p>
                                            {t("outOfStock")}
                                        </p>
                                    </>
                                )}
                            </div>

                            <div className='row gap-4 w-full'>
                                <QuantitySelector quantity={quantity}
                                    onQuantityChange={(quantity) =>
                                        setQuantity(quantity)
                                    }
                                />

                                <Button className="row w-full flex-1 flex-wrap" disabled={!buttonEnables}
                                onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
        
                                        addToCart(
                                            {
                                                ProductId: productID,
                                                Count: quantity
                                            },
                                            {
                                                onSuccess: () => {
                                                    toast.success("Product added to cart");
                                                },
                                                onError: (error) => {
                                                    toast.error(
                                                        error.response?.data?.message ||
                                                        "Failed to add product to cart"
                                                    );
                                                },
                                            }
                                        );
                                    }}>
                                    <ShoppingCart className='size-5' />
                                    {t("addToCart")}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/*Reviews Section */}
            <section className='pt-12 pb-8'>
                <div className="container">
                    <div className='stack gap-10'>
                        {/*Title */}
                        <div className='w-full row justify-between'>
                            <h2 className='text-heading-foreground text-2xl xs:text-3xl font-semibold tracking-[-0.32px]'>
                                {t("customerReviews")}
                            </h2>
                            <div className='row gap-4 text-primary py-2 px-4 bg-primary/20 rounded-lg border border-primary'>
                                <BadgeCheck className='size-5' />
                                {t("verified")}
                            </div>
                        </div>

                        {/*Reviews */}
                        <div className='grid grid-cols-1 lg:grid-cols-3 gap-12 w-full'>
                            {/*Post Review */}
                            <div className='p-6 h-fit rounded-lg bg-secondary-background border border-background-border'>
                                <div className='w-full stack items-start gap-4'>
                                    <h3 className='text-lg xs:text-xl text-heading-foreground font-semibold'>
                                        {t("shareYourExperience")}
                                    </h3>
                                    <p className='text-xs sm:text-sm font-medium tracking-[0.14px]'>
                                        {t("howWasYourProduct")}
                                    </p>

                                    <div className="row gap-0">
                                        {Array.from({ length: 5 }, (_, index) => {
                                            const starNumber = index + 1;

                                            const isActive = starNumber <= rating;

                                            return (
                                                <button key={starNumber} onClick={() => setRating(starNumber)} className="cursor-pointer" 
                                                    aria-label={`${starNumber} stars`}>
                                                    <Star className={`size-5 transition-all duration-150 ${isActive
                                                                ? "text-primary"
                                                                : "text-muted-foreground"}`}
                                                        fill={isActive ? "currentColor" : "none"}/>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <Textarea value={review} onChange={(e) => setReview(e.target.value)} 
                                        placeholder={t("writeYourReviewHere")} className='min-h-30'/>

                                    <Button className="w-full" onClick={handleSubmitReview} disabled={isPending}>
                                         {isPending ? t("submitting") : t("submitReview")}
                                    </Button>
                                </div>
                            </div>

                            {/*Review */}
                            <div className='lg:col-span-2 stack w-full gap-8'>
                                {data.response?.reviews.slice(0, numberOfReviews).map( (review) => (
                                    <div className='stack items-start w-full gap-4 p-6 rounded-lg border border-sidebar-input-border'>
                                        {/*name + date + rating*/}
                                        <div className='capitalize w-full row items-start justify-between'>
                                            <div className='stack items-start gap-1.5'>
                                                <p className='text-xs xs:text-sm font-semibold text-heading-foreground tracking-[0.14px]'>
                                                    {review.userName}
                                                </p>
                                                <p className="text-[10px] xs:text-xs">
                                                    {new Date(review.createdAt).toLocaleString("en-US", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                        hour: "numeric",
                                                        minute: "2-digit",
                                                    })}
                                                </p>
                                            </div>
                                            <div className="row gap-0">
                                                {Array.from({ length: Math.floor(review.rating) }, (_, i) => (
                                                    <Star key={i} className="size-3.5 text-primary" fill="currentColor" strokeWidth={0}/>
                                                ))}
                                            </div>
                                        </div>

                                        <p className='text-sm xs:text-base'>
                                            {review.comment}
                                        </p>
                                    </div>
                                ))}
                                <Button variant='outline' className="w-full" onClick={() => setNumberOfReviews((prev) => prev + 2)}
                                    disabled={numberOfReviews >= data.response.reviews.length}>
                                    {t("loadMoreReviews")}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
