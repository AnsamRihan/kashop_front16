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
import useLogin from "@/hooks/useLogin"
import { useState } from "react"
import { TriangleAlert } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import useAuthStore from "@/store/useAuthStore"
import { useQueryClient } from "@tanstack/react-query"

export function LoginForm({className, ...props}) {
  const setToken = useAuthStore((state) => state.setToken);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [loginError, setLoginError] = useState("");
  const {register, handleSubmit} = useForm();
  const {t} = useTranslation("login");

  const {
    mutate: postLogin,
    isPending 
  } = useLogin();

  const onSubmit = async (data) => {
    postLogin(data, {
      onSuccess: (response) => {
        if (response.data.success) {
          setToken(response.data.accessToken);
          // Remove any previous unauthenticated query state
          queryClient.removeQueries({
              queryKey: ["Profile"],
          });

          queryClient.removeQueries({
              queryKey: ["cart"],
          });
          navigate("/");
        }
      },

      onError: (error) => {
         setLoginError(
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
            {t("description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">{t("email")}</FieldLabel>
                <Input id="email" type="email" placeholder="m@example.com" {...register("email")} required />
              </Field>
              <Field>
                <div className="w-full row justify-between">
                  <FieldLabel htmlFor="password">{t("password")}</FieldLabel>
                  <Link
                    to="/forgot-password"
                    className="inline-block text-[10px] underline-offset-4 hover:underline text-end">
                    {t("forgotPassword")}
                  </Link>
                </div>
                <Input id="password" type="password" {...register("password")} required />
              </Field>
              <Field>
                {loginError && (
                  <div className="row gap-1 text-sm text-destructive">
                    <TriangleAlert className="h-4 w-4 mr-2" />
                    {loginError}
                  </div>
                )}
                <Button variant="gradiant" type="submit" disabled={isPending}>
                  {isPending ? t("loggingIn") : t("login")}
                </Button>
                <FieldDescription className="text-start">
                  {t("noAccount")}{" "}
                  <Link to="/register">
                    {t("signUp")}
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
