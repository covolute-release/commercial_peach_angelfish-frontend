import { calculatePriceForShippingOption } from "@/lib/data/fulfillment.server";
import type { Route } from "./+types/fulfillment.calculate-price-for-shipping";

export const action = async ({ request }: Route.ActionArgs) => {
  try {
    const formData = await request.json();
    const optionId = formData.option_id as string;
    const cartId = formData.cart_id as string;
    const data = formData.data as string;
    const shippingOption = await calculatePriceForShippingOption(
      request,
      optionId,
      cartId,
      data ? JSON.parse(data) : undefined,
    );
    return new Response(
      JSON.stringify({
        success: true,
        shipping_option: shippingOption,
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
