import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enLogin from "./translations/en/login.json";
import arLogin from "./translations/ar/login.json";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                login: enLogin,
            },
            ar: {
                login: arLogin,
            },
        },

        lng: localStorage.getItem("language") || "en",
        fallbackLng: "en",
    });

export default i18n;