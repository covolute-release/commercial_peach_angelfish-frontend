import { useLoaderData } from "@remix-run/node";
import type { Route } from "./+types/_main.$countryCode.cart";
import CartTemplate from "@/modules/cart/templates";
import { retrieveCustomer } from "@/lib/data/customer.server";
import { retrieveCart } from "@/lib/data/cart.server";

export const meta: Route.MetaDescriptors = [
  {
    title: "Cart",
    description: "View your cart",
  },
];

export const loader = async ({ request }: Route.LoaderArgs) => {
  const [customer, cart] = await Promise.all([retrieveCustomer(request), retrieveCart(request)]);

  return { customer, cart };
};

export default function Cart() {
  const { customer, cart } = useLoaderData<typeof loader>();

  return <CartTemplate cart={cart} customer={customer} />;
}
