import * as yup from "yup";

export const updateEmailSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address"),

  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be at most 64 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    )
});