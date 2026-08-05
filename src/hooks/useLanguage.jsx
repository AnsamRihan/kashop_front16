import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function useLanguage() {
  const { i18n } = useTranslation();

  const language = i18n.language;

  useEffect(() => {
    document.documentElement.dir =
      language === "ar" ? "rtl" : "ltr";

    document.documentElement.lang = language;

    localStorage.setItem("language", language);
  }, [language]);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return {
    language,
    changeLanguage,
  };
}