import * as yup from "yup";

export const RegisterSchema = yup.object({
  userName: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters"),

  fullName: yup
    .string()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters")
    .max(40, "Full name must be at most 40 characters"),

  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be at most 64 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),

  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^05\d{8}$/,
      "Please enter a valid phone number"
    ),
});