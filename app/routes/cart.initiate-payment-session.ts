import { initiatePaymentSession, retrieveCart } from "@/lib/data/cart.server";
import type { Route } from "./+types/cart.initiate-payment-session";

export const action = async ({ request }: Route.ActionArgs) => {
  try {
    const formData = await request.json();
    const cartId = formData.cart_id as string;
    const providerId = formData.provider_id as string;
    const cart = await retrieveCart(request);
    if (!cart || cart.id !== cartId) {
      throw new Response("Not Found", { status: 404 });
    }

    await initiatePaymentSession(request, cart, {
      provider_id: providerId,
    });
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error.toString() }), {
      status: 500,
      headers: new Headers({ "Content-Type": "application/json" }),
    });
  }
};
