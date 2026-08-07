"use client"

import { LogOut, UserRound } from "lucide-react"
import { Link } from "react-router-dom"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"
import { userMenuItems } from "@/constants/userMenuItems"
import useAuthStore from "@/store/useAuthStore"

export default function DesktopUserMenu({ onLogout }) {
  const token = useAuthStore((state) => state.token);
  const isLoggedIn = !!token;

  const { t } = useTranslation("userMenuItems")

  const user = {
    name: "Ansam",
    email: "ansam@example.com",
    avatar: "",
  }

  const handleLogout = () => {
    console.log("Logout")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon" className="rounded-full p-1 hover:text-primary">
            <Avatar className="size-8">
              {isLoggedIn ? (
                <AvatarFallback className="text-sm bg-primary text-primary-foreground">
                  {user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              ) : (
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <UserRound className="size-5" />
                </AvatarFallback>
              )}
            </Avatar>
          </Button>
        }
      />

      {isLoggedIn ? (
        <DropdownMenuContent className="min-w-56 rounded-lg"
          align="end" side="bottom" sideOffset={8}>
          {/* user info */}
          <DropdownMenuGroup>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-start text-sm">
                <Avatar className="size-8">
                  <AvatarImage
                    src={user.avatar}
                    alt={user.name}
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="grid min-w-0 flex-1 leading-tight">
                  <span className="truncate font-medium">
                    {user.name}
                  </span>

                  <span className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
          </DropdownMenuGroup>
          
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            {userMenuItems.map((item) => {
              const Icon = item.icon

              return (
                <DropdownMenuItem
                  key={item.key}
                  render={<Link to={item.path} />}
                >
                  <Icon />
                  {t(item.key)}
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem variant="destructive" onClick={onLogout}>
            <LogOut />
            {t("logout")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent className="min-w-56 rounded-lg p-2"
          align="end" side="bottom" sideOffset={8}>
          <Link to="/login" className="block w-full">
            <Button variant="gradiant" className="w-full">
              {t("signIn")}
            </Button>
          </Link>
        </DropdownMenuContent>
      )}

    </DropdownMenu>
  )
}