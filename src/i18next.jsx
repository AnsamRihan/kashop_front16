import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enLogin from "./translations/en/login.json";
import arLogin from "./translations/ar/login.json";

import enSignup from "./translations/en/signup.json";
import arSignup from "./translations/ar/signup.json";

import enForgotPassword from "./translations/en/forgotPassword.json"
import arForgotPassword from "./translations/ar/forgotPassword.json"

import enResetPassword from "./translations/en/resetPassword.json"
import arResetPassword from "./translations/ar/resetPassword.json"

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                login: enLogin,
                signup: enSignup,
                forgotPassword: enForgotPassword,
                resetPassword: enResetPassword,
            },
            ar: {
                login: arLogin,
                signup: arSignup,
                forgotPassword: arForgotPassword,
                resetPassword: arResetPassword,
            },
        },

        lng: localStorage.getItem("language") || "en",
        fallbackLng: "en",
    });

export default i18n;