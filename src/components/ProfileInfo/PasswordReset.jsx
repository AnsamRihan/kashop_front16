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

    const { t } = useTranslation();

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
                        toast.error(response?.data?.message || "Password updated successfully!");
                        resetPassword();
                    }else{
                        toast.error(
                            response?.data?.message ||
                            "Failed to update password."
                        );
                    } 
                    
                },
                onError: (error) => {
                    toast.error(
                        error.response?.data?.message ||
                        "Failed to update password."
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
                    password
                </h2>
                <p className='text-sm'>
                    Please enter your current password to change your password.
                </p>
            </div>
            <Separator />

            <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
                <FieldGroup className='gap-4'>
                    <Field>
                        <div className='grid grid-cols-1 gap-1.5 md:grid-cols-[minmax(100px,280px)_minmax(300px,800px)] md:gap-8'>
                            <FieldLabel htmlFor="currentPassword" data-invalid={!!errors.currentPassword}>
                                Current password <span className="text-red-500">*</span>
                            </FieldLabel>
                            <div className='stack items-start gap-1.5 w-full'>
                                <Input id="currentPassword" type="password" {...register("currentPassword")} placeholder="Enter current password" aria-invalid={!!errors.currentPassword} />
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
                                New password <span className="text-red-500">*</span>
                            </FieldLabel>
                            <div className='stack items-start gap-1.5 w-full'>
                                <Input id="newPassword" type="password" {...register("newPassword")} placeholder="Enter new password" aria-invalid={!!errors.newPassword} />
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
                                Confirm new password <span className="text-red-500">*</span>
                            </FieldLabel>
                            <div className='stack items-start gap-1.5 w-full'>
                                <Input id="confirmNewPassword" type="password" {...register("confirmNewPassword")} placeholder="Confirm new password"
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
