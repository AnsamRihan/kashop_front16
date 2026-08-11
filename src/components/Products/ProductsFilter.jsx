import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { productSortItems } from "@/constants/productSortItems";
import { Separator } from "../ui/separator";

export default function ProductFilters({
  totalCount,
  sortBy,
  setSortBy,
  isLoading,
  isError,
}) {
  const { t } = useTranslation("filter");

  return (
    <div className='stack gap-3 w-full'>
      <Separator />

      <div className="center justify-between w-full">
        <p className="text-xs xxs:text-sm">
          {!isLoading && !isError ? (
            <span className="font-bold text-heading-foreground">
              {totalCount}
            </span>
          ) : (
            <span className="font-bold text-heading-foreground">
              {t("no")}
            </span>
          )}

          {" "}
          {t("productsFound")}
        </p>

        <div className="row gap-6">
          <div className="row">
            <span className="capitalize text-xs xxs:text-sm hidden md:block">
              {t("sortBy")}
            </span>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 text-xs xxs:text-sm bg-secondary-background">
                <SelectValue>
                  {t(
                    productSortItems.find(
                      (item) => item.value === sortBy
                    )?.translationKey
                  )}
                </SelectValue>
              </SelectTrigger>

              <SelectContent className="w-48">
                <SelectGroup>
                  {productSortItems.map((item) => (
                    <SelectItem
                      key={item.value}
                      value={item.value}
                      className="text-xs xxs:text-sm"
                    >
                      {t(item.translationKey)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />
    </div>
  );
}