import * as yup from "yup";
import i18n from "@/i18next";

export const ForgotPasswordSchema = yup.object({
  email: yup
    .string()
    .required(i18n.t("emailRequired", {
      ns: "validation",
    }))
    .email(i18n.t("emailInvalid", {
      ns: "validation",
    })),
});