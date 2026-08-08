import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";

import enLogin from "./translations/en/login.json";
import arLogin from "./translations/ar/login.json";

import enSignup from "./translations/en/signup.json";
import arSignup from "./translations/ar/signup.json";

import enForgotPassword from "./translations/en/forgotPassword.json"
import arForgotPassword from "./translations/ar/forgotPassword.json"

import enResetPassword from "./translations/en/resetPassword.json"
import arResetPassword from "./translations/ar/resetPassword.json"

import enSearchInput from "./translations/en/searchInput.json"
import arSearchInput from "./translations/ar/searchInput.json"

import enUserMenuItems from "./translations/en/userMenuItems.json"
import arUserMenuItems from "./translations/ar/userMenuItems.json"

import enNavLinks from "./translations/en/navLinks.json"
import arNavLinks from "./translations/ar/navLinks.json"

import enFooter from "./translations/en/footer.json"
import arFooter from "./translations/ar/footer.json"

import enHome from "./translations/en/home.json"
import arHome from "./translations/ar/home.json"

import enProducts from "./translations/en/products.json"
import arProducts from "./translations/ar/products.json"

import enPagination from "./translations/en/pagination.json"
import arPagination from "./translations/ar/pagination.json"

i18n
    .use(detector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                login: enLogin,
                signup: enSignup,
                forgotPassword: enForgotPassword,
                resetPassword: enResetPassword,
                search: enSearchInput,
                userMenuItems: enUserMenuItems,
                navLinks: enNavLinks,
                footer: enFooter,
                home: enHome,
                products: enProducts,
                pagination: enPagination,
            },
            ar: {
                login: arLogin,
                signup: arSignup,
                forgotPassword: arForgotPassword,
                resetPassword: arResetPassword,
                search: arSearchInput,
                userMenuItems: arUserMenuItems,
                navLinks: arNavLinks,
                footer: arFooter,
                home: arHome,
                products: arProducts,
                pagination: arPagination,
            },
        },

        fallbackLng: "en",
    });

export default i18n;