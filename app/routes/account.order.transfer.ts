import { createTransferRequest } from "@/lib/data/orders.server";
import type { Route } from "./+types/account.address";

export const action = async ({ request }: Route.ActionArgs) => {
  try {
    const formData = await request.formData();
    const { success, error, order } = await createTransferRequest(request, formData);
    if (!success) {
      return new Response(JSON.stringify({ success: false, error, order }), {
        status: 500,
        headers: new Headers({ "Content-Type": "application/json" }),
      });
    }

    return new Response(JSON.stringify({ success: true, order, error }), {
      status: 200,
      headers: new Headers({ "Content-Type": "application/json" }),
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error.toString(), order: null }), {
      status: 500,
      headers: new Headers({ "Content-Type": "application/json" }),
    });
  }
};
