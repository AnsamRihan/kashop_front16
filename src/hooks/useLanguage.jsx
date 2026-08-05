import { useEffect, useState } from "react";

export default function useLanguage() {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );

  useEffect(() => {
    document.documentElement.dir =
      language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return {
    language,
    changeLanguage,
  };
}