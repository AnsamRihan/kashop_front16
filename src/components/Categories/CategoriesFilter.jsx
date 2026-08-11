import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { Separator } from "../ui/separator";
import { ListFilter } from "lucide-react";
import { Button } from "../ui/button";

export default function CategoriesFilters({
    categoryName,
    categories,
    categoryID,
    setCategoryID,
    children 
}) {
    const { t } = useTranslation("categories");
    const selectedCategoryName = categories?.find(
        (category) => category.id === categoryID
    )?.name;

    return (
        <div className="stack w-full gap-8">
            <div className='stack gap-3 w-full'>
                <Separator />

                <div className="center justify-between w-full">

                    <div className="row">
                        <span className="capitalize text-xs xxs:text-sm">
                            {t("category")}
                        </span>

                        <p className="text-xs xxs:text-sm font-bold text-heading-foreground hidden md:block">
                            {categoryName}
                        </p>
                    </div>

                    <div className="md:hidden">
                        <Select value={String(categoryID)} onValueChange={(value) => setCategoryID(Number(value))}>
                            <SelectTrigger className="w-fit text-[10px] xxs:text-sm bg-secondary-background">
                                <SelectValue>
                                    {selectedCategoryName}
                                </SelectValue>
                            </SelectTrigger>

                            <SelectContent className="w-48">
                                <SelectGroup>
                                    {categories?.map((category) => (
                                        <SelectItem
                                            key={category.id}
                                            value={String(category.id)}
                                            className="text-xs xxs:text-sm">

                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                    </div>
                </div>

                <Separator />
            </div>
            <div className="row gap-6 w-full items-start">

                {/* Categories sidebar */}
                <div className="row gap-1 hidden md:block">
                    <div className="stack items-start gap-4 lg:w-60 md:w-45">

                        <div className="row">
                            <ListFilter className="text-primary w-5" />

                            <h2 className="font-semibold text-lg text-heading-foreground">
                                {t("categories")}
                            </h2>
                        </div>

                        <div className="stack w-full items-start">
                            {categories.map( (category) => (
                                    categoryID === category.id ? (
                                        <Button key={category.id} variant="transparent"
                                            className="justify-start w-full py-1 px-2 text-sm capitalize text-primary font-semibold
                                                bg-primary/10">
                                            {category.name}
                                        </Button>
                                    ) : (
                                        <Button key={category.id} variant="transparent"
                                            className="justify-start w-full py-1 px-2 text-sm capitalize
                                                hover:text-primary hover:font-semibold hover:bg-primary/10 "
                                            onClick={() => setCategoryID(category.id)}>
                                            {category.name}
                                        </Button>
                                    )
                                )
                            )}
                        </div>
                    </div>
                </div>

                {/* Products in category */}
                <div className="w-full">
                    {children}
                </div>

            </div>
        </div>
    );
}