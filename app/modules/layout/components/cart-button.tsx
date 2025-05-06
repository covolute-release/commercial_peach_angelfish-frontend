import CartDropdown from "./cart-dropdown";
import { useLoaderData } from "@remix-run/node";
import type { loader } from "@/routes/_main";

export default function CartButton() {
  const { cart } = useLoaderData<typeof loader>();

  return <CartDropdown cart={cart} />;
}
