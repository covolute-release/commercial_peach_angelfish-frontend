import { placeOrder } from "@/lib/data/cart.server";
import type { Route } from "./+types/cart.place-order";

export const action = async ({ request }: Route.ActionArgs) => {
  try {
    const responseHeaders = new Headers();
    const response = await placeOrder(request, responseHeaders);
    if (response instanceof Response) {
      return response;
    }

    throw new Error("Unable to place order");
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error.toString() }), {
      status: 500,
      headers: new Headers({ "Content-Type": "application/json" }),
    });
  }
};
