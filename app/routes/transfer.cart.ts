import type { Route } from "./+types/transfer.cart";
import { transferCart } from "@/lib/data/customer.server";

export const action = async ({ request }: Route.ActionArgs) => {
  await transferCart(request);
  return new Response(null, { status: 200 });
};
