import { setAddresses } from "@/lib/data/cart.server";
import type { Route } from "./+types/account.addresses.set";

export const action = async ({ request }: Route.ActionArgs) => {
  try {
    const formData = await request.formData();
    const response = await setAddresses(request, formData);
    if (!(response instanceof Response)) {
      return new Response(JSON.stringify({ success: false, error: response }), {
        status: 500,
        headers: new Headers({ "Content-Type": "application/json" }),
      });
    }

    return response;
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error.toString() }), {
      status: 500,
      headers: new Headers({ "Content-Type": "application/json" }),
    });
  }
};
