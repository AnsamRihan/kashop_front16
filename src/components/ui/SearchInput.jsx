import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useTranslation } from "react-i18next"

export function SearchInput() {

  const { t } = useTranslation("search")

  return (
    <Field>
      <ButtonGroup className='h-11.5'>

        <Input id="input-button-group" placeholder={t("SearchPlaceholder")} 
        className='h-full placeholder:text-foreground/70 text-foreground text-xs xxs:text-sm border-e-0
        bg-sidebar-input-background border-sidebar-input-border'/>

        <Button variant="outline" className='h-full cursor-pointer bg-sidebar-input-background
        border-sidebar-input-border hover:bg-sidebar-input-background'>
          <Search className="size-4.5"/>
        </Button>

      </ButtonGroup>
    </Field>
  )
}
