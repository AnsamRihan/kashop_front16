import useUpdatePassword from '@/hooks/useUpdatePassword';
import { updatePasswordSchema } from '@/validations/updatePasswordSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function PasswordReset({ data }) {

    const { t } = useTranslation("profile");

    const { mutate: updatePassword, isPending } = useUpdatePassword();

    const { register, handleSubmit,
        reset: resetPassword, formState: { errors } } = useForm({
            resolver: yupResolver(updatePasswordSchema),
            mode: "onChange"
        });

    const onSubmit = (formData) => {
        updatePassword(
            {
                CurrentPassword: formData.currentPassword,
                NewPassword: formData.newPassword,
                ConfirmNewPassword: formData.confirmNewPassword,
            },
            {
                onSuccess: (response) => {
                    if(response.data.success){
                        toast.error(response?.data?.message || t("profile.password.updated"));
                        resetPassword();
                    }else{
                        toast.error(
                            response?.data?.message ||
                            t("profile.password.updateFailed")
                        );
                    } 
                    
                },
                onError: (error) => {
                    toast.error(
                        error.response?.data?.message ||
                        t("profile.password.updateFailed")
                    );
                },
            }
        );
    };
    return (
        <section className='stack items-start gap-4 w-full'>
            {/*Title */}
            <div className='stack items-start gap-0.5'>
                <h2 className='text-heading-foreground font-semibold capitalize'>
                    {t("profile.password.title")}
                </h2>
                <p className='text-sm'>
                    {t("profile.password.description")}
                </p>
            </div>
            <Separator />

            <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
                <FieldGroup className='gap-4'>
                    <Field>
                        <div className='grid grid-cols-1 gap-1.5 md:grid-cols-[minmax(100px,280px)_minmax(300px,800px)] md:gap-8'>
                            <FieldLabel htmlFor="currentPassword" data-invalid={!!errors.currentPassword}>
                                {t("profile.password.currentPassword")} <span className="text-red-500">*</span>
                            </FieldLabel>
                            <div className='stack items-start gap-1.5 w-full'>
                                <Input id="currentPassword" type="password" {...register("currentPassword")} placeholder={t("profile.password.currentPasswordPlaceholder")} aria-invalid={!!errors.currentPassword} />
                                {errors.currentPassword && (
                                    <FieldError>
                                        {errors.currentPassword.message}
                                    </FieldError>
                                )}
                            </div>
                        </div>
                    </Field>

                    <Separator />

                    <Field>
                        <div className='grid grid-cols-1 gap-1.5 md:grid-cols-[minmax(100px,280px)_minmax(300px,800px)] md:gap-8'>
                            <FieldLabel htmlFor="newPassword" data-invalid={!!errors.newPassword}>
                                {t("profile.password.newPassword")} <span className="text-red-500">*</span>
                            </FieldLabel>
                            <div className='stack items-start gap-1.5 w-full'>
                                <Input id="newPassword" type="password" {...register("newPassword")} placeholder={t("profile.password.newPasswordPlaceholder")} aria-invalid={!!errors.newPassword} />
                                {errors.newPassword && (
                                    <FieldError>
                                        {errors.newPassword.message}
                                    </FieldError>
                                )}
                            </div>
                        </div>
                    </Field>

                    <Separator />

                    <Field>
                        <div className='grid grid-cols-1 gap-1.5 md:grid-cols-[minmax(100px,280px)_minmax(300px,800px)] md:gap-8'>
                            <FieldLabel htmlFor="confirmNewPassword" data-invalid={!!errors.confirmNewPassword}>
                                {t("profile.password.confirmNewPassword")} <span className="text-red-500">*</span>
                            </FieldLabel>
                            <div className='stack items-start gap-1.5 w-full'>
                                <Input id="confirmNewPassword" type="password" {...register("confirmNewPassword")} placeholder={t("profile.password.confirmNewPasswordPlaceholder")}
                                    aria-invalid={!!errors.confirmNewPassword} />
                                {errors.confirmNewPassword && (
                                    <FieldError>
                                        {errors.confirmNewPassword.message}
                                    </FieldError>
                                )}
                            </div>
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
