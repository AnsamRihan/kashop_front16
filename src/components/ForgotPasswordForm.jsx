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
import { useForm } from "react-hook-form"
import { useState } from "react"
import { MoveLeft, MoveRight, TriangleAlert } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import useForgotPassword from "@/hooks/useForgotPassword"
import { ForgotPasswordSchema } from "@/validations/ForgotPasswordSchema"
import { yupResolver } from "@hookform/resolvers/yup"

export function ForgotPasswordForm({className, ...props}) {
  const navigate = useNavigate();
  const [sendCodeError, setSendCodeError] = useState("");

  const {register, handleSubmit, watch, formState:{errors}} = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
    mode: "onChange"
  });
  const email = watch("email", "")

  const {t, i18n} = useTranslation("forgotPassword");

  const {
    mutate: postEmail,
    isPending 
  } = useForgotPassword();

  const onSubmit = async (data) => {
    postEmail(data, {
      onSuccess: (response) => {
        if (response.data.success) {
          localStorage.setItem("email", data.email);
          navigate("/reset-password");
        }
      },

      onError: (error) => {
         setSendCodeError(
          error.response?.data?.message || "Sending Code failed. Please try again."
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
            {t("description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field data-invalid={errors?.email}>
                <FieldLabel htmlFor="email">{t("email")}</FieldLabel>
                <Input id="email" type="email" placeholder="m@example.com" {...register("email")} required 
                aria-invalid={errors?.email}/>
                {errors.email && (
                    <FieldDescription className="text-start text-destructive">
                    {errors.email?.message}
                    </FieldDescription>
                )}
              </Field>
              <Field>
                {sendCodeError && (
                  <div className="row gap-1 text-sm text-destructive">
                    <TriangleAlert className="h-4 w-4 mr-2" />
                    {sendCodeError}
                  </div>
                )}
                <Button variant="gradiant" type="submit" disabled={isPending || !email 
                    || Object.keys(errors).length > 0}>
                    {isPending ? t("sendingCode") : t("sendCode")}
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
