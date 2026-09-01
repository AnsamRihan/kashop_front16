import { BubbleBackground } from '@/components/animate-ui/backgrounds/bubble';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { CircleQuestionMark, Mail, MapPin, MessageSquareText, Phone } from 'lucide-react';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea';
import contact from "@/assets/images/contact/contact.jpg";
import { Link } from 'react-router-dom';

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

const selectOptions = [
  { label: "General Inquiry", value: "generalInquiry" },
  { label: "Order Support", value: "orderSupport" },
  { label: "Product Question", value: "productQuestion" },
  { label: "Feedback", value: "feedback" },
]

export default function Contact() {
  const { t } = useTranslation("contact");
  const [subject, setSubject] = useState("generalInquiry");

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

      {/*contact info section */}
      <section className='py-16 bg-tertiary-background'>
        <div className="container">
          <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16'>
            {/*Send us a message div */}
            <div className='stack items-start gap-4'>
              <h2 className='text-heading-foreground font-semibold tracking-[-0.32px] text-xl xxs:text-2xl xs:text-3xl'>
                {t("form.title")}
              </h2>

              <p>
                {t("form.description")}
              </p>

              <form className='w-full pt-4'>
                <FieldGroup className='gap-3'>
                  {/*Full name */}
                  <Field>
                    <FieldLabel htmlFor="fullName" className='font-semibold tracking-[0.14px] xs:text-base'>
                      {t("form.fullName.label")}
                    </FieldLabel>
                    <Input id="fullName" type="text" placeholder={t("form.fullName.placeholder")} className='h-10 py-3.5 px-4 text-base!' />
                  </Field>

                  {/*Email address */}
                  <Field>
                    <FieldLabel htmlFor="email" className='font-semibold tracking-[0.14px] xs:text-base'>
                      {t("form.email.label")}
                    </FieldLabel>
                    <Input id="email" type="email" placeholder={t("form.email.placeholder")} className='h-10 py-3.5 px-4 text-base!' />
                  </Field>

                  {/*Subject */}
                  <Field>
                    <FieldLabel htmlFor="subject" className='font-semibold tracking-[0.14px] xs:text-base'>
                      {t("form.subject.label")}
                    </FieldLabel>

                    <Select value={subject} onValueChange={setSubject}>
                      <SelectTrigger id="subject" className="w-full h-10! px-4 text-base!">
                        <SelectValue>
                          {t(`form.subject.options.${subject}`)}
                        </SelectValue>
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>{t("form.subject.label")}</SelectLabel>

                          {selectOptions.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {t(`form.subject.options.${item.value}`)}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>

                  {/*order number */}
                  <Field>
                    <FieldLabel htmlFor="orderNumber" className='font-semibold tracking-[0.14px] xs:text-base'>
                      {t("form.orderNumber.label")}
                    </FieldLabel>
                    <Input id="orderNumber" type="text" placeholder={t("form.orderNumber.placeholder")} className='h-10 py-3.5 px-4 text-base!' />
                  </Field>

                  {/*Message */}
                  <Field>
                    <FieldLabel htmlFor="message" className='font-semibold tracking-[0.14px] xs:text-base'>
                      {t("form.message.label")}
                    </FieldLabel>
                    <Textarea id="message" placeholder={t("form.message.placeholder")} className='py-3.5 px-4 text-base! bg-tertiary-background h-35' />
                  </Field>

                  <Field>
                    <Button variant='gradiant' className='w-fit!'>
                      {t("form.sendButton")}
                    </Button>
                  </Field>
                </FieldGroup>
              </form>
            </div>

            {/*We're here for you. */}
            <div className='stack items-start gap-4'>
              <h3 className='text-heading-foreground font-semibold text-xl'>
                {t("contactInfo.title")}
              </h3>

              <p>
                {t("contactInfo.description")}
              </p>

              <div className='pt-4 pb-8 stack items-start gap-6'>
                <div className='row items-start gap-4'>
                  <MapPin className='text-primary size-5' />

                  <div className='stack items-start gap-1'>
                    <h4 className='text-heading-foreground font-semibold text-sm tracking-[0.14px]'>
                      {t("contactInfo.visitUs")}
                    </h4>
                    <p className='font-medium'>
                      {t("contactInfo.location")}
                    </p>
                  </div>
                </div>

                <div className='row items-start gap-4'>
                  <Mail className='text-primary size-5' />

                  <div className='stack items-start gap-1'>
                    <h4 className='text-heading-foreground font-semibold text-sm tracking-[0.14px]'>
                      {t("contactInfo.email")}
                    </h4>
                    <p className='font-medium'>
                      support@kashop.com
                    </p>
                  </div>
                </div>

                <div className='row items-start gap-4'>
                  <Phone className='text-primary size-5' />

                  <div className='stack items-start gap-1'>
                    <h4 className='text-heading-foreground font-semibold text-sm tracking-[0.14px]'>
                      {t("contactInfo.phone")}
                    </h4>
                    <p className='font-medium'>
                      {t("contactInfo.phoneNumber")}
                    </p>
                  </div>
                </div>
              </div>

              <img src={contact} alt={t("imageAlt")} className='w-full h-80 object-cover object-bottom rounded-[16px]' />
            </div>
          </div>
        </div>
      </section>

      {/*FAQ section */}
      <section className='py-16'>
        <div className="container">
          <div className='w-full stack items-center justify-center gap-5 text-center'>
            <div className='w-12 h-12 circle bg-primary/10 center'>
              <CircleQuestionMark className='text-primary size-7.5' />
            </div>

            <div className='stack items-center gap-2'>
              <h2 className='text-heading-foreground font-semibold tracking-[-0.32px] text-xl xxs:text-2xl xs:text-3xl'>
                {t("faq.title")}
              </h2>

              <p className='max-w-xl'>
                {t("faq.description")}
              </p>
            </div>

            <Link to='/FAQs'>
              <Button variant='gradiant'>
                {t("faq.button")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}