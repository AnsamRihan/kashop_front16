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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema } from "@/validations/RegisterSchema";
import useRegister from "@/hooks/useRegister";
import { TriangleAlert } from "lucide-react";

export function SignupForm({...props}) {
  const {t} = useTranslation("signup");
  const [signupError, setSignupError] = useState("");

  const {register, handleSubmit, watch, formState:{errors}} = useForm({
    resolver: yupResolver(RegisterSchema),
    mode: "onChange"
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const password = watch("password");
  const passwordMismatch = confirmPassword.length > 0 && password !== confirmPassword;
  
  const {
      mutate: postRegister,
      isPending 
    } = useRegister();

  const onSubmit = async (data) => {
    if (password !== confirmPassword) {
      return;
    }
    postRegister(data, {
      onSuccess: (response) => {
        console.log("Registration successful:", response.data);
        if (response.data.success) {
          navigate("/login");
        }
      },

      onError: (error) => {
        setSignupError(
          error.response?.data?.message || "Sign up failed. Please try again."
        );
      },
    });
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>
          {t("description")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field data-invalid={errors?.userName}>
              <FieldLabel htmlFor="userName">{t("username")}</FieldLabel>
              <Input id="userName" type="text" placeholder="John_Doe" {...register("userName")} 
              aria-invalid={errors?.userName}/>
              {errors.userName && (
                <FieldDescription className="text-start text-destructive">
                  {errors.userName?.message}
                </FieldDescription>
              )}
            </Field>
            <Field data-invalid={errors?.fullName}>
              <FieldLabel htmlFor="fullName">{t("fullName")}</FieldLabel>
              <Input id="fullName" type="text" placeholder="John Doe" {...register("fullName")} 
              aria-invalid={errors?.fullName}/>
              {errors.fullName && (
                <FieldDescription className="text-start text-destructive">
                  {errors.fullName?.message}
                </FieldDescription>
              )}
            </Field>
            <Field data-invalid={errors?.email}>
              <FieldLabel htmlFor="email">{t("email")}</FieldLabel>
              <Input id="email" type="email" placeholder="m@example.com" {...register("email")} 
              aria-invalid={errors?.email}/>
              <FieldDescription className="text-start">
                {t("emailDescription")}
              </FieldDescription>
              {errors.email && (
                <FieldDescription className="text-start text-destructive">
                  {errors.email?.message}
                </FieldDescription>
              )}
            </Field>
            <Field data-invalid={errors?.phoneNumber}>
              <FieldLabel htmlFor="phoneNumber">{t("phoneNumber")}</FieldLabel>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="059-123-4567"
                {...register("phoneNumber")}
                aria-invalid={errors?.phoneNumber}
              />
              {errors.phoneNumber && (
                <FieldDescription className="text-start text-destructive">
                  {errors.phoneNumber?.message}
                </FieldDescription>
              )}
            </Field>
            <Field data-invalid={errors?.password}>
              <FieldLabel htmlFor="password">{t("password")}</FieldLabel>
              <Input id="password" type="password" {...register("password")} 
              aria-invalid={errors?.password}/>
              {errors.password && (
                <FieldDescription className="text-start text-destructive">
                  {errors.password?.message}
                </FieldDescription>
              )}
            </Field>
            <Field data-invalid={passwordMismatch}>
              <FieldLabel htmlFor="confirm-password">
                {t("confirmPassword")}
              </FieldLabel>
              <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                aria-invalid={passwordMismatch}/>
              <FieldDescription className="text-start">
                {passwordMismatch
                  ? t("passwordMismatch")
                  : t("confirmPasswordDescription")}
              </FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                {signupError && (
                  <div className="row gap-1 text-sm text-destructive">
                    <TriangleAlert className="h-4 w-4 mr-2" />
                    {signupError}
                  </div>
                )}
                <Button variant="gradiant" type="submit" disabled={!confirmPassword || passwordMismatch 
                  || Object.keys(errors).length > 0 || isPending}>
                    {isPending ? t("creatingAccount") : t("createAccount")}
                </Button>
                <FieldDescription className="text-start">
                  {t("alreadyHaveAccount")} {" "}
                  <Link to="/login">
                    {t("login")}
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
