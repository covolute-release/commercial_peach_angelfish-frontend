import { setShippingMethod } from "@/lib/data/cart.server";
import type { Route } from "./+types/cart.set-shipping-method";

export const action = async ({ request }: Route.ActionArgs) => {
  try {
    const formData = await request.json();
    const cartId = formData.cart_id as string;
    const shippingMethodId = formData.shipping_method_id as string;
    const cart = await setShippingMethod({
      request,
      cartId,
      shippingMethodId,
    });
    return new Response(
      JSON.stringify({
        success: true,
        cart,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error.toString() }), {
      status: 500,
      headers: new Headers({ "Content-Type": "application/json" }),
    });
  }
};
