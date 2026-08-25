import useUpdateEmail from '@/hooks/useUpdateEmail';
import { updateEmailSchema } from '@/validations/updateEmailSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function PersonalInfo({ data }) {

    const { t } = useTranslation("profile");

    const { mutate: updateEmail, isPending } = useUpdateEmail();

    const { register, handleSubmit, formState: { errors } } = useForm(
        {
            resolver: yupResolver(updateEmailSchema),
            mode: "onChange"
        }
    );

    const [firstName, ...lastNameParts] = data?.fullName?.trim().split(/\s+/) || [];
    const lastName = lastNameParts.join(" ");

    const onSubmit = (formData) => {
        if (formData.email !== data?.email) {
            updateEmail(
                {
                    NewEmail: formData.email,
                }, {
                onSuccess: () => {
                    toast.success(t("profile.personalInfo.emailUpdated"));
                }, onError: (error) => {
                    toast.error(
                        error.response?.data?.message ||
                        t("profile.personalInfo.emailUpdateFailed")
                    );
                },
            }
            );
        } else {
            toast.error(t("profile.personalInfo.currentEmail"))
        }
    };
    return (
        <section className='stack items-start gap-4 w-full'>
            {/*Title */}
            <div className='stack items-start gap-0.5'>
                <h2 className='text-heading-foreground font-semibold capitalize'>
                    {t("profile.personalInfo.title")}
                </h2>
                <p className='text-sm'>
                    {t("profile.personalInfo.description")}
                </p>
            </div>
            <Separator />

            <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
                <FieldGroup className='gap-4'>
                    <Field>
                        <div className='md:grid grid-cols-1 md:grid-cols-[minmax(100px,280px)_minmax(300px,800px)] md:gap-8'>
                            <FieldLabel htmlFor="firstName" className=" hidden md:flex">
                                {t("profile.personalInfo.name")}
                            </FieldLabel>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
                                <div className='stack gap-1.5 items-start w-full'>
                                    <FieldLabel htmlFor="firstName" className="md:hidden">
                                        {t("profile.personalInfo.firstName")}
                                    </FieldLabel>
                                    <Input id="firstName" type="text" placeholder="First Name" value={firstName} />
                                </div>
                                <div className='stack gap-1.5 items-start w-full'>
                                    <FieldLabel htmlFor="lastName" className="md:hidden">
                                        {t("profile.personalInfo.lastName")}
                                    </FieldLabel>
                                    <Input id="lastName" type="text" placeholder="Last Name" value={lastName} />
                                </div>
                            </div>
                        </div>
                    </Field>

                    <Separator />

                    <Field>
                        <div className='grid grid-cols-1 gap-1.5 md:grid-cols-[minmax(100px,280px)_minmax(300px,800px)] md:gap-8'>
                            <FieldLabel htmlFor="email" data-invalid={!!errors.email}>
                                {t("profile.personalInfo.email")} <span className="text-red-500">*</span>
                            </FieldLabel>
                            <div className='stack items-start gap-1.5 w-full'>
                                <Input id="email" type="text" {...register("email")} placeholder={t("profile.personalInfo.emailPlaceholder")} defaultValue={data?.email} aria-invalid={!!errors.email} />
                                {errors.email && (
                                    <FieldError>
                                        {errors.email.message}
                                    </FieldError>
                                )}
                            </div>
                        </div>
                    </Field>

                    <Separator />

                    <Field>
                        <div className='grid grid-cols-1 gap-1.5 md:grid-cols-[minmax(100px,280px)_minmax(300px,800px)] md:gap-8'>
                            <FieldLabel htmlFor="phoneNumber">
                                {t("profile.personalInfo.phoneNumber")}
                            </FieldLabel>
                            <Input id="phoneNumber" type="text" placeholder="05X-XXX-XXXX" defaultValue={data?.phoneNumber} />
                        </div>
                    </Field>

                    <Separator />

                    <Field>
                        <div className='grid grid-cols-1 gap-1.5 md:grid-cols-[minmax(100px,280px)_minmax(300px,800px)] md:gap-8'>
                            <FieldLabel htmlFor="city">
                                {t("profile.personalInfo.city")}
                            </FieldLabel>
                            <Input id="city" type="text" placeholder={t("profile.personalInfo.cityPlaceholder")} defaultValue={data?.city === null ? "" : data?.city} />
                        </div>
                    </Field>

                    <Separator />

                    <Field>
                        <div className='flex justify-end w-full'>
                            <Button type="submit" disabled={Object.keys(errors).length > 0 || isPending}>
                                {isPending ? t("saving") : t("save")}
                            </Button>
                        </div>
                    </Field>
                </FieldGroup>
            </form>
        </section>
    )
}
