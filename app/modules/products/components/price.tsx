import { Text } from "@/components/text";
import { cn } from "@/lib/utils";
import type { VariantPrice } from "@/types/global";

export default function PreviewPrice({ price }: { price: VariantPrice }) {
  if (!price) {
    return null;
  }

  return (
    <>
      {price.price_type === "sale" && (
        <Text className="line-through text-ui-fg-muted" data-testid="original-price">
          {price.original_price}
        </Text>
      )}
      <Text
        className={cn("text-ui-fg-muted", {
          "text-ui-fg-interactive": price.price_type === "sale",
        })}
        data-testid="price"
      >
        {price.calculated_price}
      </Text>
    </>
  );
}
