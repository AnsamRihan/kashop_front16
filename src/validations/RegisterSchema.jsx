import * as yup from "yup";
import i18n from "@/i18next";

export const RegisterSchema = yup.object({
    userName: yup
        .string()
        .required(
            i18n.t("usernameRequired", { ns: "validation" })
        )
        .min(
            3,
            i18n.t("usernameMin", { ns: "validation" })
        )
        .max(
            30,
            i18n.t("usernameMax", { ns: "validation" })
        ),

    fullName: yup
        .string()
        .required(
            i18n.t("fullNameRequired", { ns: "validation" })
        )
        .min(
            2,
            i18n.t("fullNameMin", { ns: "validation" })
        )
        .max(
            40,
            i18n.t("fullNameMax", { ns: "validation" })
        ),

    email: yup
        .string()
        .required(
            i18n.t("emailRequired", { ns: "validation" })
        )
        .email(
            i18n.t("emailInvalid", { ns: "validation" })
        ),

    password: yup
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

    phoneNumber: yup
        .string()
        .required(
            i18n.t("phoneRequired", { ns: "validation" })
        )
        .matches(
            /^05\d{8}$/,
            i18n.t("phoneInvalid", { ns: "validation" })
        ),
});