import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { TextAlignJustify, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SearchInput } from "./ui/SearchInput";
import { Link } from "react-router-dom";
import Navlink from "./Navlink/Navlink";
import UserMenu from "./UserMenu/UserMenu";
import useAuthStore from "@/store/useAuthStore";

export function SideBar() {
    const token = useAuthStore((state) => state.token);
    const isLoggedIn = !!token;
    
    const { t, i18n } = useTranslation("userMenuItems");
    const direction = i18n.language === "ar" ? "right" : "left";

    return (
        <Drawer swipeDirection={direction}>
            <DrawerTrigger 
            render={<Button variant="ghost" className='hover:text-primary p-0'>
                <TextAlignJustify className="size-4 xxs:size-5"/>
            </Button>} />

            <DrawerContent className='max-xxs:w-full'>
                <DrawerHeader>
                    <div className="w-full row justify-between">
                        <div className='ps-2.5 center h-full'>
                            <Link to="/" className='text-primary text-xl font-bold tracking-[-0.32px]'>
                                Kashop
                            </Link>
                        </div>
                        <DrawerClose 
                        render={<Button variant="ghost" className='hover:text-primary '>
                            <X className="size-5" />
                        </Button>} />
                    </div>
                </DrawerHeader>

                <div className="flex-1 overflow-y-auto p-4">
                    <div className="stack gap-4 w-full">
                        <SearchInput />
                        
                        {/*List */}
                        <div className="w-full">
                            <Navlink mobile/>
                        </div>
                    </div>
                </div>

                <DrawerFooter className='pt-4 border-t border-t-sidebar-input-border'>
                    {isLoggedIn ? (
                        <UserMenu mobile />
                    ) : (
                        <Link to="/login" className="w-full">
                            <Button variant="gradiant" className="w-full" size="lg">
                                {t("signIn")}
                            </Button>
                        </Link>
                    )}
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
