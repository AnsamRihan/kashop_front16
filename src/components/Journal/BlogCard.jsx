import React from "react";
import { useTranslation } from "react-i18next";
import { Card } from "../ui/card";
import { ArrowRight } from "lucide-react";

export default function BlogCard({ blog }) {
    const { t } = useTranslation("blogs");

    const translationKey = blog.translationKey;

    return (
        <Card className="group overflow-hidden bg-tertiary-background rounded-[16px] stack items-start gap-6 cursor-pointer
            transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg">
                
            <img src={blog.image} alt={t(`${translationKey}.title`)}
                className="rounded-none object-cover object-center w-full aspect-[4/3]
                transition-transform duration-500 ease-out group-hover:scale-105"/>

            <div className="w-full stack items-start gap-3 px-6">
                <div className="w-full row justify-between text-xs xs:text-sm tracking-[0.14px] font-medium" >
                    <span className="capitalize px-2.5 py-0.5 border border-secondary
                        circle text-secondary bg-secondary/10">
                        {t(`${translationKey}.category`)}
                    </span>

                    <span>
                        {t(`${translationKey}.date`)}
                    </span>
                </div>

                <h3 className="text-base xs:text-lg font-semibold text-heading-foreground">
                    {t(`${translationKey}.title`)}
                </h3>

                <p className="text-sm xs:text-base">
                    {t(`${translationKey}.description`)}
                </p>

                <span className="row justify-center gap-1 text-primary
                    hover:text-secondary transition-all duration-150 ease-in-out">
                    {t("readMore")}
                    <ArrowRight className="size-3 mt-0.5 rtl:rotate-180" />
                </span>
            </div>
        </Card>
    );
}