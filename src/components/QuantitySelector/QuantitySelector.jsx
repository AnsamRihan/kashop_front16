import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function QuantitySelector({
    quantity,
    onQuantityChange,
    min = 1,
    max = 99,
    textClassName="text-sm",
    iconSize="size-4",
    size="size-9"
}) {
    const decrease = () => {
        onQuantityChange(Math.max(min, quantity - 1));
    };

    const increase = () => {
        onQuantityChange(Math.min(max, quantity + 1));
    };

    return (
        <div className="inline-flex h-full items-center rounded-md border border-border bg-secondary-background">
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-full rounded-e-none"
                onClick={decrease}
                disabled={quantity <= min}
                aria-label="Decrease quantity"
            >
                <Minus className={iconSize} />
            </Button>

            <span className={`flex ${size} items-center justify-center ${textClassName} font-medium tabular-nums`}>
                {quantity}
            </span>

            <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-full rounded-s-none"
                onClick={increase}
                disabled={quantity >= max}
                aria-label="Increase quantity"
            >
                <Plus className={iconSize} />
            </Button>
        </div>
    );
}