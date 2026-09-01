import { BubbleBackground } from '@/components/animate-ui/backgrounds/bubble'
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import React from 'react'
import { useTranslation } from 'react-i18next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqItems } from "@/constants/faqItems";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FAQs() {

  const { t, i18n } = useTranslation("FAQs");

  const items = faqItems.map((item) => ({
    value: item.value,
    trigger: t(`questions.${item.value}.trigger`),
    content: t(`questions.${item.value}.content`),
  }));

  return (
    <>
      {/*Header */}
      <section className="pb-8 text-center">
        <BubbleBackground interactive>
          <div className="container">
            <div className="relative z-10 w-full center">
              <div className="stack gap-5.5 py-16">
                <h1 className="onBubbleBgHero">
                  {t("header.title")}
                </h1>

                <p className='onBubbleBgP'>
                  {t("header.description")}
                </p>

                <Field className='center xs:pt-3'>
                  <div className="xs:h-13 w-full max-w-140 stack xs:row gap-3 xs:gap-1 rounded-[16px] xs:rounded-full bg-secondary-background p-2.5">
                    <Input id="input-button-group" placeholder={t("header.searchPlaceholder")}
                      className="h-full flex-1 border-0 bg-transparent! px-3 xs:text-base text-foreground
                    placeholder:text-foreground/70 shadow-none focus-visible:ring-0"/>

                    <Button variant='gradiant' type="submit" className="w-full xs:w-fit h-full xs:rounded-full border-0">
                      {t("header.searchButton")}
                    </Button>
                  </div>
                </Field>
              </div>
            </div>
          </div>
        </BubbleBackground>
      </section>

      {/*FAQs */}
      <section className='pb-8 sm:pt-4 sm:pb-12'>
        <div className="container">
          <div className="center stack gap-8">
            <h2 className='text-heading-foreground font-semibold tracking-[-0.36px] text-2xl xxs:text-3xl xs:text-4xl
            text-center'>
              {t("mostAskedQuestions")}
            </h2>

            {/*most asked questions */}
            <Accordion multiple className="max-w-2xl stack gap-4" dir={i18n.dir()}>
              {items.map((item) => (
                <AccordionItem key={item.value} value={item.value} className='w-full rounded-[16px] bg-tertiary-background
                transition-all duration-200 ease-in-out hover:shadow-md border border-background-border'>
                  <AccordionTrigger className='w-full p-6 hover:no-underline cursor-pointer text-heading-foreground
                  text-sm xxs:text-base xs:text-lg'>
                    {item.trigger}
                  </AccordionTrigger>
                  <AccordionContent className='p-6 pt-0 text-foreground'>
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/*Contact us */}
      <section className='pb-8 text-center'>
        <div className="container">
          <div className='relative overflow-hidden rounded-[24px] bg-linear-to-br from-primary/10 via-secondary/5 to-primary/10
          border border-secondary/20 p-10 md:p-16 center stack gap-4'>

            <div className='absolute -top-24 -inset-e-24 size-64 rounded-full border-40 border-primary/10 pointer-events-none' />
            <div className='absolute -bottom-32 -inset-s-32 size-80 rounded-full border-50 border-secondary/10 pointer-events-none' />

            <div className='relative z-10 center stack gap-4'>
              <h2 className='text-heading-foreground font-bold text-xl xxs:text-2xl xs:text-3xl'>
                {t("contact.title")}
              </h2>

              <p className='max-w-lg pb-4 text-sm xs:text-base'>
                {t("contact.description")}
              </p>

              <Link to='/contact'>
                <Button variant='gradiant' className='row text-sm xs:text-base'>
                  {t("contact.button")}
                  <ArrowRight className='rtl:rotate-180' />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
