import type { Route } from "./+types/order.accept-transfer-request";
import { acceptTransferRequest } from "@/lib/data/orders.server";

export const action = async ({ request }: Route.ActionArgs) => {
  try {
    const formData = await request.json();
    const id = formData.id as string;
    const token = formData.token as string;
    const response = await acceptTransferRequest(request, id, token);
    return new Response(JSON.stringify(response), {
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
