import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import useTheme from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { theme, changeTheme } = useTheme();

  const toggleTheme = () => {
    changeTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button variant="ghost focus:bg-transparent" size="icon"
      onClick={toggleTheme}
      className="text-foreground hover:text-primary">
      {theme === "dark" ? (
        <Sun className="size-5" />
      ) : (
        <Moon className="size-5" />
      )}
    </Button>
  );
}