"use client"

import {
    BadgeCheck,
    Bell,
    ChevronsUpDown,
    CreditCard,
    LogOut,
    Sparkles,
} from "lucide-react"
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

export default function MobileUserMenu({ onLogout }) {
    const { t } = useTranslation("userMenuItems");

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
            {/* Trigger */}
            <DropdownMenuTrigger
                render={
                    <Button
                        className="h-auto w-full justify-start gap-3 p-2 bg-transparent text-foreground
                         hover:bg-accent hover:text-accent-foreground"
                    >
                        <Avatar className="h-10 w-10 circle">
                            <AvatarFallback className="circle bg-primary text-primary-foreground">
                                {user.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>

                        <div className="grid min-w-0 flex-1 text-start text-sm leading-tight">
                            <span className="truncate font-medium">
                                {user.name}
                            </span>

                            <span className="truncate text-xs text-muted-foreground">
                                {user.email}
                            </span>
                        </div>

                        <ChevronsUpDown className="size-4 shrink-0" />
                    </Button>
                }
            />

            {/* Dropdown */}
            <DropdownMenuContent
                className="min-w-56 rounded-lg"
                side="top"
                align="start"
                sideOffset={4}
            >
                {/* User info */}
                <DropdownMenuGroup>
                    <DropdownMenuLabel className="p-0 font-normal">
                        <div className="flex items-center gap-2 px-1 py-1.5 text-start text-sm">
                            <Avatar className="h-8 w-8 circle">
                                <AvatarFallback className="circle bg-primary text-primary-foreground">
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

                {/* Logout */}
                <DropdownMenuItem
                    variant="destructive"
                    onClick={onLogout}
                >
                    <LogOut />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}