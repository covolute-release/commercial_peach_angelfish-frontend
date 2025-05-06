import { addToCart } from "@/lib/data/cart.server";
import type { Route } from "./+types/$countryCode.add.to.cart";

export const action = async ({ request, params }: Route.ActionArgs) => {
  const formData = await request.formData();
  const responseHeaders = new Headers();
  await addToCart({
    request,
    responseHeaders,
    variantId: formData.get("variantId") as string,
    quantity: 1,
    countryCode: params.countryCode,
  });
  return new Response("OK", { status: 200, headers: responseHeaders });
};
