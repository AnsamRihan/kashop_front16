import * as yup from "yup";
import i18n from "@/i18next";

export const ResetPasswordSchema = yup.object({
    newPassword: yup
        .string()
        .required(
            i18n.t("passwordRequired", { ns: "validation" })
        )
        .min(
            8,
            i18n.t("passwordMin", { ns: "validation" })
        )
        .max(
            64,
            i18n.t("passwordMax", { ns: "validation" })
        )
        .matches(
            /[A-Z]/,
            i18n.t("passwordUppercase", { ns: "validation" })
        )
        .matches(
            /[a-z]/,
            i18n.t("passwordLowercase", { ns: "validation" })
        )
        .matches(
            /[0-9]/,
            i18n.t("passwordNumber", { ns: "validation" })
        )
        .matches(
            /[^A-Za-z0-9]/,
            i18n.t("passwordSpecial", { ns: "validation" })
        ),

    code: yup
        .string()
        .required(
            i18n.t("codeRequired", { ns: "validation" })
        )
        .length(
            4,
            i18n.t("codeLength", { ns: "validation" })
        )
        .matches(
            /^\d{4}$/,
            i18n.t("codeNumbers", { ns: "validation" })
        ),
});