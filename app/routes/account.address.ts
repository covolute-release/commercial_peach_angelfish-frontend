import type { Route } from "./+types/account.address";
import { addCustomerAddress } from "@/lib/data/customer.server";

export const action = async ({ request }: Route.ActionArgs) => {
  try {
    const formData = await request.formData();
    const { success, error } = await addCustomerAddress(
      request,
      {
        isDefaultShipping: formData.get("is_default_shipping") === "true",
        isDefaultBilling: formData.get("is_default_billing") === "true",
      },
      formData,
    );
    if (!success) {
      return new Response(JSON.stringify({ success: false, error }), {
        status: 500,
        headers: new Headers({ "Content-Type": "application/json" }),
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: new Headers({ "Content-Type": "application/json" }),
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error.toString() }), {
      status: 500,
      headers: new Headers({ "Content-Type": "application/json" }),
    });
  }
};
