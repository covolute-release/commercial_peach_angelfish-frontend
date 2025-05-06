import { ExclamationCircleSolid } from "@medusajs/icons";
import type { StoreCart, StoreCustomer } from "@medusajs/types";
import { Button } from "@/components/button";
import { useFetcher } from "@remix-run/node";

function CartMismatchBanner(props: {
  customer: StoreCustomer;
  cart: StoreCart;
}) {
  const fetcher = useFetcher();
  const { customer, cart } = props;

  if (!customer || !!cart.customer_id) {
    return;
  }

  const handleSubmit = async () => {
    fetcher.submit({
      action: "/transfer/cart",
      method: "post",
    });
  };

  return (
    <div className="flex items-center justify-center small:p-4 p-2 text-center bg-orange-300 small:gap-2 gap-1 text-sm mt-2 text-orange-800">
      <div className="flex flex-col small:flex-row small:gap-2 gap-1 items-center">
        <span className="flex items-center gap-1">
          <ExclamationCircleSolid className="inline" />
          Something went wrong when we tried to transfer your cart
        </span>

        <span>·</span>

        <Button
          variant="transparent"
          className="hover:bg-transparent active:bg-transparent focus:bg-transparent disabled:text-orange-500 text-orange-950 p-0 bg-transparent"
          size="base"
          disabled={fetcher.state === "submitting"}
          onClick={handleSubmit}
        >
          {fetcher.state === "submitting" ? "Transferring.." : "Run transfer again"}
        </Button>
      </div>
    </div>
  );
}

export default CartMismatchBanner;
