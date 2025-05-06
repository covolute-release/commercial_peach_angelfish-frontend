import { listCartOptions, retrieveCart } from "@/lib/data/cart.server";
import { retrieveCustomer } from "@/lib/data/customer.server";
import type { StoreCartShippingOption } from "@medusajs/types";
import CartMismatchBanner from "@/modules/layout/components/cart-mismatch-banner";
import Footer from "@/modules/layout/footer";
import Nav from "@/modules/layout/nav";
import FreeShippingPriceNudge from "@/modules/shipping/components/free-shipping-price-nudge";

import type { Route } from "./+types/_main";
import { Outlet, useLoaderData } from "@remix-run/node";
import { listRegions } from "@/lib/data/regions.server";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const [customer, cart, regions] = await Promise.all([
    retrieveCustomer(request),
    retrieveCart(request),
    listRegions(),
  ]);
  let shippingOptions: StoreCartShippingOption[] = [];

  if (cart) {
    const { shipping_options } = await listCartOptions(request);

    shippingOptions = shipping_options;
  }

  return {
    customer,
    cart,
    regions,
    shippingOptions,
  };
};

export default function Main() {
  const { customer, cart, regions, shippingOptions } = useLoaderData<typeof loader>();

  return (
    <>
      <Nav regions={regions} />
      {customer && cart && <CartMismatchBanner customer={customer} cart={cart} />}

      {cart && <FreeShippingPriceNudge variant="popup" cart={cart} shippingOptions={shippingOptions} />}
      <Outlet />
      <Footer />
    </>
  );
}
