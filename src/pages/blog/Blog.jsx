import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useTranslation } from 'react-i18next'
import blog_header from "@/assets/images/journal/blog-header.jpg";
import { ArrowRight } from 'lucide-react'


export default function Blog() {
  const { t } = useTranslation("blogs")
  return (
    <>
      {/*Header section */}
      <section className='py-10 xs:py-15'>
        <div className="container center stack gap-5.5">
          <h1 className='font-bold text-3xl xxs:text-4xl xs:text-5xl text-heading-foreground tracking-[-0.96px] text-center'>
            {t("header.title")}
          </h1>
          <p className='max-w-162.5 text-sm xs:text-base text-center'>
            {t("header.description")}
          </p>

          <Field className='center xs:pt-3'>
            <div className="xs:h-13 w-full max-w-140 stack xs:row gap-3 xs:gap-1 rounded-[16px] xs:rounded-full bg-secondary-background p-2.5">
              <Input id="input-button-group" placeholder={t("header.searchPlaceholder")}
                className="h-full flex-1 border-0 bg-transparent! px-3 xs:text-base text-foreground
              placeholder:text-foreground/70 shadow-none focus-visible:ring-0"/>

              <Button type="submit" className="w-full xs:w-fit h-full xs:rounded-full border-0">
                {t("header.searchButton")}
              </Button>
            </div>
          </Field>

          <div className='mt-10 overflow-hidden bg-tertiary-background rounded-[16px] 
          grid grid-cols-1 md:grid-cols-[2fr_1fr] w-full'>
            <img src={blog_header} alt={t("headerBlog.title")} className="w-full aspect-[4/3] md:h-[443px] object-cover object-bottom"/>     

            <div className="p-6 lg:p-12 text-start w-full h-full stack items-start justify-center gap-3">
                <div className="w-full row justify-between text-xs xs:text-sm tracking-[0.14px] font-medium" >
                    <span className="capitalize px-2.5 py-0.5 border border-secondary
                        circle text-secondary bg-secondary/10">
                        {t("headerBlog.category")}
                    </span>
                </div>

                <h3 className="text-base xs:text-lg font-semibold text-heading-foreground">
                    {t("headerBlog.title")}
                </h3>

                <p className="text-sm xs:text-base">
                    {t("headerBlog.description")}
                </p>

                <span className="row justify-center gap-1 text-primary
                    hover:text-secondary transition-all duration-150 ease-in-out">
                    {t("readMore")}
                    <ArrowRight className="size-3 mt-0.5 rtl:rotate-180" />
                </span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
