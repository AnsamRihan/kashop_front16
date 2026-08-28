import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import useCategories from "@/hooks/useCategories";
import ad1_mobiles from './../../assets/images/home/CategoryPromotions/ad1-mobiles.jpg'
import ad2_clothes from './../../assets/images/home/CategoryPromotions/ad2-clothes.jpg'
import ad3_electronics from './../../assets/images/home/CategoryPromotions/ad3-electronics.jpg'
import ad4_shoes from './../../assets/images/home/CategoryPromotions/ad4-shoes.jpg'
import ad5_homeAppliances from './../../assets/images/home/CategoryPromotions/ad5-homeAppliances.jpg'
import ad6_BeautyProducts from './../../assets/images/home/CategoryPromotions/ad6-BeautyProducts.jpg'
import { Button } from "../ui/button";

export default function CategoryPromotions() {
    const { t, i18n } = useTranslation("home");

    const { data } = useCategories();

    const categories = data?.response?.data ?? [];

    const getCategoryLink = (englishName, arabicName) => {
        const categoryName =
            i18n.language === "ar" ? arabicName : englishName;

        const category = categories.find(
            (category) =>
                category.name.toLowerCase() === categoryName.toLowerCase()
        );

        return category
            ? `/categories?category=${category.id}`
            : "/categories";
    };

    return (
        <section className="pb-8 pt-4">
            <div className="container">
                <div className="stack w-full gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                        <img src={ad1_mobiles} alt="mobile picture"
                            className="rounded-[16px] w-full h-100 object-cover object-center" />

                        <div className="w-full sm:max-w-107 h-full stack items-start justify-center gap-4 sm:ps-6 lg:ps-12">
                            <span className="uppercase text-secondary text-sm font-semibold tracking-[0.7px]">
                                MOBILE DEALS
                            </span>
                            <h2 className="capitalize text-primary font-semibold  text-2xl xs:text-3xl tracking-[-0.32px]">
                                Meet Your Next Phone
                            </h2>
                            <p className="text-sm xs:text-base font-medium">
                                Discover the latest mobile models with the features, style, and performance you need for everyday life.
                            </p>
                            <Link to={getCategoryLink("Mobiles", "هواتف")}>
                                <Button variant="outline">
                                    Shop Mobiles
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                        <img src={ad2_clothes} alt="mobile picture"
                            className="rounded-[16px] w-full h-100 object-cover object-center order-1 sm:order-2" />

                        <div className="w-full sm:max-w-107 h-full stack items-start justify-center gap-4 sm:ps-6 lg:ps-12 order-2 sm:order-1">
                            <span className="uppercase text-secondary text-sm font-semibold tracking-[0.7px]">
                                STYLE EDIT
                            </span>
                            <h2 className="capitalize text-primary font-semibold  text-2xl xs:text-3xl tracking-[-0.32px]">
                                Find Your Next Favorite
                            </h2>
                            <p className="text-sm xs:text-base font-medium">
                                Explore new styles, everyday essentials, and easy-to-love pieces for every look and everyday occasion.
                            </p>
                            <Link to={getCategoryLink("Clothes", "ملابس")}>
                                <Button variant="outline">
                                    Shop Clothes
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                        <img src={ad3_electronics} alt="mobile picture"
                            className="rounded-[16px] w-full h-100 object-cover object-center" />

                        <div className="w-full sm:max-w-107 h-full stack items-start justify-center gap-4 sm:ps-6 lg:ps-12">
                            <span className="uppercase text-secondary text-sm font-semibold tracking-[0.7px]">
                                NEW IN
                            </span>
                            <h2 className="capitalize text-primary font-semibold  text-2xl xs:text-3xl tracking-[-0.32px]">
                                Tech for Every Day
                            </h2>
                            <p className="text-sm xs:text-base font-medium">
                                Discover the latest electronics for work, entertainment, communication, and everything you do every day.
                            </p>
                            <Link to={getCategoryLink("Electronics", "إلكترونيات")}>
                                <Button variant="outline">
                                    Shop Electronics
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                        <img src={ad4_shoes} alt="mobile picture"
                            className="rounded-[16px] w-full h-100 object-cover object-center order-1 sm:order-2" />

                        <div className="w-full sm:max-w-107 h-full stack items-start justify-center gap-4 sm:ps-6 lg:ps-12 order-2 sm:order-1">
                            <span className="uppercase text-secondary text-sm font-semibold tracking-[0.7px]">
                                NEW SEASON
                            </span>
                            <h2 className="capitalize text-primary font-semibold  text-2xl xs:text-3xl tracking-[-0.32px]">
                                Made for Every Step
                            </h2>
                            <p className="text-sm xs:text-base font-medium">
                                Explore shoes that combine everyday comfort with great style, from casual days to your next outing.
                            </p>
                            <Link to={getCategoryLink("Shoes", "أحذية")}>
                                <Button variant="outline">
                                    Shop Shoes
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                        <img src={ad5_homeAppliances} alt="mobile picture"
                            className="rounded-[16px] w-full h-100 object-cover object-center" />

                        <div className="w-full sm:max-w-107 h-full stack items-start justify-center gap-4 sm:ps-6 lg:ps-12">
                            <span className="uppercase text-secondary text-sm font-semibold tracking-[0.7px]">
                                HOME ESSENTIALS
                            </span>
                            <h2 className="capitalize text-primary font-semibold  text-2xl xs:text-3xl tracking-[-0.32px]">
                                Bring More Ease Home
                            </h2>
                            <p className="text-sm xs:text-base font-medium">
                                Discover practical appliances that make cooking, cleaning, and everyday tasks easier and more convenient.
                            </p>
                            <Link to={getCategoryLink("Home Appliances", "أجهزة منزلية")}>
                                <Button variant="outline">
                                    Shop Appliances
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                        <img src={ad6_BeautyProducts} alt="mobile picture"
                            className="rounded-[16px] w-full h-100 object-cover object-center order-1 sm:order-2" />

                        <div className="w-full sm:max-w-107 h-full stack items-start justify-center gap-4 sm:ps-6 lg:ps-12 order-2 sm:order-1">
                            <span className="uppercase text-secondary text-sm font-semibold tracking-[0.7px]">
                                BEAUTY PICKS
                            </span>
                            <h2 className="capitalize text-primary font-semibold  text-2xl xs:text-3xl tracking-[-0.32px]">
                                Go Ahead, Treat Yourself
                            </h2>
                            <p className="text-sm xs:text-base font-medium">
                                Discover makeup, skincare, haircare, and everyday beauty favorites to refresh your routine and try something new.
                            </p>
                            <Link to={getCategoryLink("Beauty Products", "منتجات تجميل")}>
                                <Button variant="outline">
                                    Shop Beauty
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}