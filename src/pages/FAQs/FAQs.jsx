import { BubbleBackground } from '@/components/animate-ui/backgrounds/bubble'
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import React from 'react'
import { useTranslation } from 'react-i18next';

export default function FAQs() {

  const { t } = useTranslation("FAQs")
  return (
    <>
      <section className="pb-8 text-center">
        <BubbleBackground interactive>
          <div className="relative z-10 w-full center">
            <div className="stack gap-5.5 px-4 py-16">
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
        </BubbleBackground>
      </section>
    </>
  );
}
