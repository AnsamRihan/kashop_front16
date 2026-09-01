import { BubbleBackground } from '@/components/animate-ui/backgrounds/bubble';
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Contact() {
  const { t } = useTranslation("contact");

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
              </div>
            </div>
          </div>
        </BubbleBackground>
      </section>

      
    </>
  )
}
