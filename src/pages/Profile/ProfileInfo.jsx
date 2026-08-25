import CircularProgress from '@/components/CircularProgress/CircularProgress';
import ErrorFetchingData from '@/components/ErrorFetchingData.jsx/ErrorFetchingData';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
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
import { Separator } from '@/components/ui/separator';
import useUserStore from '@/store/useUserStore';

export default function ProfileInfo() {
    const { t } = useTranslation();

    const { data, isLoading, isError, error } = useProfile();

    //-----------------------------------------------------------

    const { mutate: updateEmail, isPending: isPendingEmail } = useUpdateEmail();

    const { register, handleSubmit, formState: { errors } } = useForm(
        {
            resolver: yupResolver(updateEmailSchema),
            mode: "onChange"
        }
    );

    const onSubmit = (formData) => {
        if(formData.email !== data?.email){
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
        }else{
            toast.error("This is the email you currently use!")
        } 
    };

    //-----------------------------------------------


    const { mutate: updatePassword, isPending: isUpdatingPassword } = useUpdatePassword();

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

    //------------------------------------------
    if (isLoading) {
        return <CircularProgress />
    }

    if (isError) {
        return <ErrorFetchingData error={error} />
    }

    if(!isLoading && !isError){
        console.log(data);
    }

    const [firstName, ...lastNameParts] = data?.fullName?.trim().split(/\s+/) || [];
    const lastName = lastNameParts.join(" ");

    return (
        <div className='stack items-start gap-5'>
            <h1 className='capitalize text-xl font-semibold text-heading-foreground'>
                Settings
            </h1>

            {/*Personal Info */}
            <section className='stack items-start gap-4 w-full'>
                {/*Title */}
                <div className='stack items-start gap-0.5'>
                    <h2 className='text-heading-foreground font-semibold capitalize'>
                        personal info
                    </h2>
                    <p className='text-sm'>
                        Update your photo and personal details here.
                    </p>
                </div>
                <Separator />

                <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup className='gap-4'>
                        <Field>
                            <div className='md:grid grid-cols-1 md:grid-cols-[minmax(100px,280px)_minmax(300px,800px)] md:gap-8'>
                                <FieldLabel htmlFor="firstName" className=" hidden md:flex">Name</FieldLabel>

                                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
                                    <div className='stack gap-1.5 items-start w-full'>
                                        <FieldLabel htmlFor="firstName" className="md:hidden">First Name <span className="text-red-500">*</span> </FieldLabel>
                                        <Input id="firstName" type="text" placeholder="First Name" value={firstName}/>
                                    </div>
                                    <div className='stack gap-1.5 items-start w-full'>
                                        <FieldLabel htmlFor="lastName" className="md:hidden">Last Name <span className="text-red-500">*</span> </FieldLabel>
                                        <Input id="lastName" type="text" placeholder="Last Name" value={lastName} />
                                    </div>
                                </div>
                            </div>
                        </Field>

                        <Separator />

                        <Field>
                            <div className='grid grid-cols-1 gap-1.5 md:grid-cols-[minmax(100px,280px)_minmax(300px,800px)] md:gap-8'>
                                <FieldLabel htmlFor="email" data-invalid={!!errors.email}>
                                    Email <span className="text-red-500">*</span> 
                                </FieldLabel>
                                <div className='stack items-start gap-1.5 w-full'>
                                    <Input id="email" type="text" {...register("email")} placeholder="Email" defaultValue={data?.email} aria-invalid={!!errors.email}/>
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
                                    Phone Number
                                </FieldLabel>
                                <Input id="phoneNumber" type="text" placeholder="05X-XXX-XXXX" defaultValue={data?.phoneNumber} />
                            </div>
                        </Field>

                        <Separator />

                        <Field>
                            <div className='grid grid-cols-1 gap-1.5 md:grid-cols-[minmax(100px,280px)_minmax(300px,800px)] md:gap-8'>
                                <FieldLabel htmlFor="city">
                                    City
                                </FieldLabel>
                                <Input id="city" type="text" placeholder="Enter your city" defaultValue={data?.city===null ? "" : data?.city} />
                            </div>
                        </Field>

                        <Separator />

                        <Field>
                            <div className='flex justify-end w-full'>
                                <Button type="submit" disabled = {Object.keys(errors).length > 0 || isPendingEmail}>
                                    {isPendingEmail ? t("saving") : t("save")}
                                </Button>
                            </div>
                        </Field>
                    </FieldGroup>
                </form>
            </section>
        </div>
    )
}
