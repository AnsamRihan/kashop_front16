import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import BlogCard from "../Journal/BlogCard";
import { blogs } from "@/constants/blogs";

export default function Journal() {
    const { t } = useTranslation("home");

    return (
        <section className="pb-8">
            <div className="container">
                <div className="w-full stack items-start gap-8">

                    {/* Title */}
                    <div className="w-full row justify-between">
                        <h2 className="heading">
                            {t("journal.title")}
                        </h2>

                        <Link to="/blog" className="view-all-link">
                            {t("viewAll")}
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                        {blogs.slice(0, 4).map((blog) => (
                            <BlogCard key={blog.translationKey} blog={blog} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}