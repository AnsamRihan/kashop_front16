import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import useCategories from "@/hooks/useCategories";

import ad1_mobiles from "@/assets/images/home/CategoryPromotions/ad1-mobiles.jpg";
import ad2_clothes from "@/assets/images/home/CategoryPromotions/ad2-clothes.jpg";
import ad3_electronics from "@/assets/images/home/CategoryPromotions/ad3-electronics.jpg";
import ad4_shoes from "@/assets/images/home/CategoryPromotions/ad4-shoes.jpg";
import ad5_homeAppliances from "@/assets/images/home/CategoryPromotions/ad5-homeAppliances.jpg";
import ad6_BeautyProducts from "@/assets/images/home/CategoryPromotions/ad6-BeautyProducts.jpg";

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

    const promotions = [
        {
            key: "mobile",
            image: ad1_mobiles,
            englishCategory: "Mobiles",
            arabicCategory: "هواتف",
            imageAlt: "Mobile phones",
        },
        {
            key: "clothes",
            image: ad2_clothes,
            englishCategory: "Clothes",
            arabicCategory: "ملابس",
            imageAlt: "Clothing",
        },
        {
            key: "electronics",
            image: ad3_electronics,
            englishCategory: "Electronics",
            arabicCategory: "إلكترونيات",
            imageAlt: "Electronics",
        },
        {
            key: "shoes",
            image: ad4_shoes,
            englishCategory: "Shoes",
            arabicCategory: "أحذية",
            imageAlt: "Shoes",
        },
        {
            key: "homeAppliances",
            image: ad5_homeAppliances,
            englishCategory: "Home Appliances",
            arabicCategory: "أجهزة منزلية",
            imageAlt: "Home appliances",
        },
        {
            key: "beauty",
            image: ad6_BeautyProducts,
            englishCategory: "Beauty Products",
            arabicCategory: "منتجات تجميل",
            imageAlt: "Beauty products",
        },
    ];

    return (
        <section className="pb-8 pt-4">
            <div className="container">
                <div className="stack w-full gap-6">
                    
                    {promotions.map((promotion, index) => {
                        const isImageFirst = index % 2 === 0;

                        return (
                            <div key={promotion.key} className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                                <img src={promotion.image} alt={promotion.imageAlt}
                                    className={`rounded-[16px] w-full h-100 object-cover object-center
                                    ${!isImageFirst ? "order-1 sm:order-2" : ""}`}/>

                                <div className={`w-full sm:max-w-107 h-full stack items-start justify-center
                                        gap-4 sm:ps-6 lg:ps-12 ${!isImageFirst ? "order-2 sm:order-1" : ""}`}>

                                    <span className="uppercase text-secondary text-sm font-semibold tracking-[0.7px]">
                                        {t(`categoryPromotions.${promotion.key}.label`)}
                                    </span>

                                    <h2 className="capitalize text-primary font-semibold text-2xl xs:text-3xl tracking-[-0.32px]">
                                        {t(`categoryPromotions.${promotion.key}.title`)}
                                    </h2>

                                    <p className="text-sm xs:text-base font-medium">
                                        {t(`categoryPromotions.${promotion.key}.description`)}
                                    </p>

                                    <Link to={getCategoryLink(promotion.englishCategory, promotion.arabicCategory)}>
                                        <Button variant="outline">
                                            {t(`categoryPromotions.${promotion.key}.button`)}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>
        </section>
    );
}