import { Earth } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useLanguage from "@/hooks/useLanguage";

export default function LanguageSwitcher() {
  const { changeLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" className='hover:text-primary'>
            <Earth className="size-5" />
          </Button>
        }
      />

      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => changeLanguage("en")}>
          English
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => changeLanguage("ar")}>
          العربية
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}