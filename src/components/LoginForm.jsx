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
import axiosInstance from "@/api/axiosInstance"
import useLogin from "@/hooks/useLogin"
import { useState } from "react"
import { TriangleAlert } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"

export function LoginForm({className, ...props}) {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const {register, handleSubmit} = useForm();

  const {
    mutate: postLogin,
    isPending 
  } = useLogin();

  const onSubmit = async (data) => {
    postLogin(data, {
      onSuccess: (response) => {
        if (response.data.success) {
          localStorage.setItem("accessToken", response.data.accessToken);
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
          <CardTitle className="font-semibold">Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" type="email" placeholder="m@example.com" {...register("email")}/>
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="w-full ml-auto inline-block text-[10px] underline-offset-4 hover:underline text-end">
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" {...register("password")} />
              </Field>
              <Field>
                {loginError && (
                  <div className="flex items-center text-sm text-destructive">
                    <TriangleAlert className="h-4 w-4 mr-2" />
                    {loginError}
                  </div>
                )}
                <Button className="btn-gradient" type="submit" disabled={isPending}>
                  {isPending ? "Logging in..." : "Login"}
                </Button>
                <FieldDescription className="text-start">
                  Don&apos;t have an account?{" "}
                  <Link to="/register">
                    Sign up
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
