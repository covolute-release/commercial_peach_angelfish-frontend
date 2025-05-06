import type { Route } from "./+types/account.address.$addressId";
import { deleteCustomerAddress, updateCustomerAddress } from "@/lib/data/customer.server";

export const action = async ({ request, params }: Route.ActionArgs) => {
  if (request.method === "DELETE") {
    return await deleteCustomerAddress(request, params.addressId);
  }
  if (request.method === "PUT") {
    try {
      const formData = await request.formData();
      const { success, error } = await updateCustomerAddress(
        request,
        {
          addressId: params.addressId,
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
      return new Response(JSON.stringify({ success: false, error: error.message }), {
        status: 500,
        headers: new Headers({ "Content-Type": "application/json" }),
      });
    }
  }
  return new Response("Method Not Allowed", { status: 405 });
};
