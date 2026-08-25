import CircularProgress from '@/components/CircularProgress/CircularProgress';
import ErrorFetchingData from '@/components/ErrorFetchingData.jsx/ErrorFetchingData';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import useProfile from '@/hooks/useProfile';
import useUpdateEmail from '@/hooks/useUpdateEmail';
import { updateEmailSchema } from '@/validations/updateEmailSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner';
import useUpdatePassword from '@/hooks/useUpdatePassword';
import { updatePasswordSchema } from '@/validations/updatePasswordSchema';

export default function ProfileInfo() {
    const { t } = useTranslation();

    const { data, isLoading, isError, error } = useProfile();
    const { mutate: updateEmail, isPending: isUpdatingEmail } = useUpdateEmail();

    const { register, handleSubmit, formState: { errors } } = useForm(
        {
            resolver: yupResolver(updateEmailSchema),
            mode: "onChange"
        }
    );

    const onSubmit = (formData) => {
        updateEmail(
            {
                NewEmail: formData.email,
            }, {
            onSuccess: () => {
                toast.success("Email updated successfully!");
            }, onError: (error) => {
                toast.error(
                    error.response?.data?.message ||
                    "Failed to update email."
                );
            },
        }
        );
    };

    //-----------------------------------------------
    

    const { mutate: updatePassword, isPending: isUpdatingPassword } =
        useUpdatePassword();

    const { register: registerPassword, handleSubmit: handlePasswordSubmit,
        reset: resetPassword, formState: { errors: passwordErrors } } = useForm({
            resolver: yupResolver(updatePasswordSchema),
            mode: "onChange"
        });

    const onPasswordSubmit = (formData) => {
        updatePassword(
            {
                CurrentPassword: formData.currentPassword,
                NewPassword: formData.newPassword,
                ConfirmNewPassword: formData.confirmNewPassword,
            },
            {
                onSuccess: (response) => {
                    console.log(console);
                    toast.success("Password updated successfully!");
                    resetPassword();
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
        <div className='stack items-start gap-6 pb-6'>
            {/*Personal Info */}
            <div className='w-full p-6 bg-tertiary-background rounded-lg border border-background-border
            stack items-start gap-6'>
                {isLoading && (
                    <CircularProgress />
                )}

                {isError && (
                    <ErrorFetchingData error={error} />
                )}

                {!isLoading && !isError && (
                    <>
                        <h2 className='text-primary font-semibold text-2xl xs:text-3xl tracking-[-0.32px] break-all'>
                            {t("personalInformation")}
                        </h2>

                        <div className='row justify-start gap-y-5 gap-x-8 sm:gap-x-15 flex-wrap'>
                            <div className='stack items-start gap-1'>
                                <h3 className='uppercase font-medium text-xs xs:text-sm tracking-[0.14px]'>
                                    {t("fullName")}
                                </h3>
                                <span className='text-heading-foreground text-base xs:text-lg break-all'>
                                    {data?.fullName}
                                </span>
                            </div>

                            <div className='stack items-start gap-1'>
                                <h3 className='uppercase font-medium text-xs xs:text-sm tracking-[0.14px]'>
                                    {t("email")}
                                </h3>
                                <span className='capitalize text-heading-foreground text-base xs:text-lg break-all'>
                                    {data?.email}
                                </span>
                            </div>

                            <div className='stack items-start gap-1'>
                                <h3 className='uppercase font-medium text-xs xs:text-sm tracking-[0.14px]'>
                                    {t("phoneNumber")}
                                </h3>
                                <span className='capitalize text-heading-foreground text-base xs:text-lg break-all'>
                                    {data?.phoneNumber}
                                </span>
                            </div>

                            <div className='stack items-start gap-1'>
                                <h3 className='uppercase font-medium text-xs xs:text-sm tracking-[0.14px]'>
                                    {t("city")}
                                </h3>
                                <span className='capitalize text-heading-foreground text-base xs:text-lg break-all'>
                                    {data?.city === null ? t("unknown") : data?.city}
                                </span>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/*Update Email */}
            <div className='w-full p-6 bg-tertiary-background rounded-lg border border-background-border
            stack items-end gap-6'>
                <h2 className='w-full flex justify-start text-primary font-semibold text-2xl xs:text-3xl tracking-[-0.32px] break-all'>
                    {t("emailManagement")}
                </h2>

                <div className='w-full sm:row sm:gap-6 sm:items-end stack gap-4 '>
                    <Field>
                        <FieldLabel htmlFor="email" data-invalid={!!errors.email}>
                            {t("newEmail")}
                        </FieldLabel>
                        <Input id="email" {...register("email")} type="email" placeholder="new.email@example.com"
                            aria-invalid={!!errors.email} className='h-11' />
                        {errors.email && (
                            <FieldError>
                                {errors.email.message}
                            </FieldError>
                        )}
                    </Field>

                    <Button type="button" className='w-full sm:w-fit' disabled={isUpdatingEmail}
                        onClick={handleSubmit(
                            onSubmit,
                            (errors) => {
                                console.log("Validation errors:", errors);
                            }
                        )}>
                        {isUpdatingEmail ? t("updating") : t("updateEmail")}
                    </Button>
                </div>
            </div>

            {/*Update Password */}
            <div className='w-full p-6 bg-tertiary-background rounded-lg border border-background-border
            stack items-end gap-6'>
                <h2 className='w-full flex justify-start text-primary font-semibold text-2xl xs:text-3xl tracking-[-0.32px]'>
                    {t("passwordManagement")}
                </h2>

                <div className='w-full stack gap-4'>

                    <Field>
                        <FieldLabel htmlFor="currentPassword" data-invalid={!!passwordErrors.currentPassword}>
                            {t("currentPassword")}
                        </FieldLabel>

                        <Input id="currentPassword" {...registerPassword("currentPassword")}
                            type="password" placeholder="Current password" aria-invalid={!!passwordErrors.currentPassword}
                            className='h-11'/>

                        {passwordErrors.currentPassword && (
                            <FieldError>
                                {passwordErrors.currentPassword.message}
                            </FieldError>
                        )}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="newPassword" data-invalid={!!passwordErrors.newPassword} >
                            {t("newPassword")}
                        </FieldLabel>

                        <Input id="newPassword" {...registerPassword("newPassword")} type="password"
                            placeholder="New password" aria-invalid={!!passwordErrors.newPassword}
                            className='h-11' />

                        {passwordErrors.newPassword && (
                            <FieldError>
                                {passwordErrors.newPassword.message}
                            </FieldError>
                        )}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="confirmNewPassword" data-invalid={!!passwordErrors.confirmNewPassword}>
                            {t("confirmNewPassword")}
                        </FieldLabel>

                        <Input id="confirmNewPassword" {...registerPassword("confirmNewPassword")} type="password"
                            placeholder="Confirm new password" aria-invalid={!!passwordErrors.confirmNewPassword}
                            className='h-11' />

                        {passwordErrors.confirmNewPassword && (
                            <FieldError>
                                {passwordErrors.confirmNewPassword.message}
                            </FieldError>
                        )}
                    </Field>

                    <Button type="button" className='w-full sm:w-fit'
                        disabled={isUpdatingPassword}
                        onClick={handlePasswordSubmit(
                            onPasswordSubmit,
                            (errors) => {
                                console.log("Validation errors:", errors);
                            }
                        )}>
                        {isUpdatingPassword ? t("updating") : t("updatePassword")}
                    </Button>
                </div>
            </div>
        </div>
    )
}
