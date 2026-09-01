import { BubbleBackground } from '@/components/animate-ui/backgrounds/bubble';
import { Button } from '@/components/ui/button';
import { Mail, MessageSquareText, Phone } from 'lucide-react';
import React from 'react'
import { useTranslation } from 'react-i18next'

export const contactOptions = [
  {
    key: "chat",
    icon: MessageSquareText,
  },
  {
    key: "email",
    icon: Mail,
  },
  {
    key: "call",
    icon: Phone,
  },
];

export default function Contact() {
  const { t } = useTranslation("contact");

  return (
    <>
      {/*Header */}
      <section className="text-center">
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
              </div>
            </div>
          </div>
        </BubbleBackground>
      </section>

      {/*how can we help section */}
      <section className='py-16 text-center'>
        <div className="container">
          <div className="stack justify-center gap-8 md:gap-12">
            <h2 className='text-heading-foreground font-semibold tracking-[-0.32px] text-2xl xxs:text-3xl xs:text-4xl'>
              {t("howCanWeHelp")}
            </h2>

            <div className='w-full flex flex-wrap justify-center gap-6'>
              {contactOptions.map((option) => {
                const Icon = option.icon;

                return (
                  <div key={option.key} className='w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]'>
                    <div className='w-full h-full stack justify-between gap-6 p-8'>
                      <div className='w-full stack gap-6'>
                        {/*icon */}
                        <div className='w-16 h-16 circle bg-primary/10 gap-4.5 center'>
                          <Icon className='text-primary' />
                        </div>

                        {/*text */}
                        <div className='stack gap-3'>
                          <h3 className='text-heading-foreground font-semibold text-xl'>
                            {t(`contactOptions.${option.key}.title`)}
                          </h3>

                          <p>
                            {t(`contactOptions.${option.key}.description`)}
                          </p>
                        </div>
                      </div>

                      <Button variant='gradiant' className='w-full'>
                        {t(`contactOptions.${option.key}.button`)}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
