import { Table } from "@/components/table";
import { Text } from "@/components/text";
import { cn } from "@/lib/utils";
import type { HttpTypes } from "@medusajs/types";
import CartItemSelect from "@/modules/cart/components/cart-item-select";
import ErrorMessage from "@/modules/checkout/components/error-message";
import DeleteButton from "@/modules/common/components/delete-button";
import LineItemOptions from "@/modules/common/components/line-item-options";
import LineItemPrice from "@/modules/common/components/line-item-price";
import LineItemUnitPrice from "@/modules/common/components/line-item-unit-price";
import LocalizedClientLink from "@/modules/common/components/localized-client-link";
import Spinner from "@/modules/common/icons/spinner";
import Thumbnail from "@/modules/products/components/thumbnail";
import { useFetcher } from "@remix-run/node";

type ItemProps = {
  item: HttpTypes.StoreCartLineItem;
  type?: "full" | "preview";
  currencyCode: string;
};

const Item = ({ item, type = "full", currencyCode }: ItemProps) => {
  const fetcher = useFetcher();

  const changeQuantity = async (quantity: number) => {
    const formData = new FormData();
    formData.append("lineId", item.id);
    formData.append("quantity", quantity.toString());
    fetcher.submit(formData, {
      method: "post",
      action: "/update/line/item",
    });
  };

  // TODO: Update this to grab the actual max inventory
  const maxQtyFromInventory = 10;
  const maxQuantity = item.variant?.manage_inventory ? 10 : maxQtyFromInventory;

  return (
    <Table.Row className="w-full" data-testid="product-row">
      <Table.Cell className="!pl-0 p-4 w-24">
        <LocalizedClientLink
          href={`/products/${item.product_handle}`}
          className={cn("flex", {
            "w-16": type === "preview",
            "small:w-24 w-12": type === "full",
          })}
        >
          <Thumbnail thumbnail={item.thumbnail} images={item.variant?.product?.images} size="square" />
        </LocalizedClientLink>
      </Table.Cell>

      <Table.Cell className="text-left">
        <Text className="txt-medium-plus text-ui-fg-base" data-testid="product-title">
          {item.product_title}
        </Text>
        <LineItemOptions variant={item.variant} data-testid="product-variant" />
      </Table.Cell>

      {type === "full" && (
        <Table.Cell>
          <div className="flex gap-2 items-center w-28">
            <DeleteButton id={item.id} data-testid="product-delete-button" />
            <CartItemSelect
              value={item.quantity}
              onChange={(value) => changeQuantity(Number.parseInt(value.target.value))}
              className="w-14 h-10 p-4"
              data-testid="product-select-button"
            >
              {/* TODO: Update this with the v2 way of managing inventory */}
              {Array.from(
                {
                  length: Math.min(maxQuantity, 10),
                },
                (_, i) => (
                  <option value={i + 1} key={i}>
                    {i + 1}
                  </option>
                ),
              )}

              <option value={1} key={1}>
                1
              </option>
            </CartItemSelect>
            {fetcher.state === "submitting" && <Spinner />}
          </div>
          <ErrorMessage error={fetcher.data} data-testid="product-error-message" />
        </Table.Cell>
      )}

      {type === "full" && (
        <Table.Cell className="hidden small:table-cell">
          <LineItemUnitPrice item={item} style="tight" currencyCode={currencyCode} />
        </Table.Cell>
      )}

      <Table.Cell className="!pr-0">
        <span
          className={cn("!pr-0", {
            "flex flex-col items-end h-full justify-center": type === "preview",
          })}
        >
          {type === "preview" && (
            <span className="flex gap-x-1 ">
              <Text className="text-ui-fg-muted">{item.quantity}x </Text>
              <LineItemUnitPrice item={item} style="tight" currencyCode={currencyCode} />
            </span>
          )}
          <LineItemPrice item={item} style="tight" currencyCode={currencyCode} />
        </span>
      </Table.Cell>
    </Table.Row>
  );
};

export default Item;
