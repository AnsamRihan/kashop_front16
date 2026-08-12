import useThemeStore from "@/store/useThemeStore";
import { useEffect } from "react";

export default function useTheme() {

  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return {
    theme,
    changeTheme,
  };
}