import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import useTheme from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { theme, changeTheme } = useTheme();

  const toggleTheme = () => {
    changeTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button variant="ghost" onClick={toggleTheme}
      className="hover:text-primary p-0">
      {theme === "dark" ? (
        <Sun className="size-4 xxs:size-5" />
      ) : (
        <Moon className="size-4 xxs:size-5" />
      )}
    </Button>
  );
}