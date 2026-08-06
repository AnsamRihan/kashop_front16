import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useForm , Controller} from "react-hook-form"
import { useState } from "react"
import { MoveLeft, MoveRight, TriangleAlert } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp"
import useResetPassword from "@/hooks/useResetPassword"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { yupResolver } from "@hookform/resolvers/yup"
import { ResetPasswordSchema } from "@/validations/ResetPasswordSchema"

export function ResetPasswordForm({ className, ...props }) {
    const navigate = useNavigate();
    const [resetPasswordError, setResetPasswordError] = useState("");
    const { register, handleSubmit, watch, control, formState:{errors}} = useForm(
        {
            resolver: yupResolver(ResetPasswordSchema),
            mode: "onChange"
        }
    );
    const { t, i18n } = useTranslation("resetPassword");
    const email = localStorage.getItem("email");
    const [confirmPassword, setConfirmPassword] = useState("");
    const password = watch("newPassword");
    const passwordMismatch = confirmPassword.length > 0 && password !== confirmPassword;


    const {
        mutate: postResetPassword,
        isPending
    } = useResetPassword();

    const onSubmit = async (data) => {
         const resetData = {
            ...data,
            email: localStorage.getItem("email"),
        };

        if (password !== confirmPassword) {
            return;
        }

        postResetPassword(resetData, {
          onSuccess: (response) => {
            if (response.data.success) {
              navigate("/login");
            }
          },
    
          onError: (error) => {
            console.log(error);
             setResetPasswordError(
              error.response?.data?.message || "Login failed. Please try again."
            );
          },
        });
    }

    return (
        <div className={cn("flex flex-col gap-6 ", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="font-semibold">{t("title")}</CardTitle>
                    <CardDescription>
                        {t("description", { email })}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Field className="w-fit" data-invalid={errors?.code}>
                                <FieldLabel htmlFor="code">{t("code")}</FieldLabel>
                                <Controller name="code" control={control} render={({ field }) => (
                                    <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS} value={field.value || ""}
                                    onChange={field.onChange} aria-invalid={!!errors.code}>
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} aria-invalid={errors?.code}/>
                                            <InputOTPSlot index={1} aria-invalid={errors?.code}/>
                                            <InputOTPSlot index={2} aria-invalid={errors?.code}/>
                                            <InputOTPSlot index={3} aria-invalid={errors?.code}/>
                                        </InputOTPGroup>
                                    </InputOTP>
                                )}
                                />
                                {errors.code && (
                                    <FieldDescription className="text-start text-destructive">
                                    {errors.code?.message}
                                    </FieldDescription>
                                )}
                            </Field>
                            <Field data-invalid={errors?.newPassword}>
                                <FieldLabel htmlFor="newPassword">{t("password")}</FieldLabel>
                                <Input id="newPassword" type="password" {...register("newPassword")} 
                                aria-invalid={errors?.newPassword} />
                                {errors.newPassword && (
                                    <FieldDescription className="text-start text-destructive">
                                    {errors.newPassword?.message}
                                    </FieldDescription>
                                )}
                            </Field>
                            <Field data-invalid={passwordMismatch}>
                                <FieldLabel htmlFor="confirm-password">
                                    {t("confirmPassword")}
                                </FieldLabel>
                                <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                    aria-invalid={passwordMismatch} />
                                <FieldDescription className="text-start">
                                    {passwordMismatch
                                        ? t("passwordMismatch")
                                        : t("confirmPasswordDescription")}
                                </FieldDescription>
                            </Field>
                            <Field>
                                {resetPasswordError && (
                                    <div className="row gap-1 text-sm text-destructive">
                                        <TriangleAlert className="h-4 w-4 mr-2" />
                                        {resetPasswordError}
                                    </div>
                                )}
                                <Button className="btn-gradient" type="submit" disabled={isPending || !confirmPassword 
                                    || Object.keys(errors).length > 0 || passwordMismatch
                                }>
                                    {isPending ? t("resettingPassword") : t("resetPassword")}
                                </Button>
                                <Link to='/login' className="text-start row gap-1 hover:text-primary transition-all duration-100 ease-in-out">
                                    {i18n.language === "ar" ? (
                                        <MoveRight className="w-4" />
                                    ) : (
                                        <MoveLeft className="w-4" />
                                    )}
                                    {t("backToLogin")}
                                </Link>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
