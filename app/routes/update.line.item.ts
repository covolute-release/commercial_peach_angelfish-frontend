import { updateLineItem } from "@/lib/data/cart.server";
import type { Route } from "./+types/update.line.item";

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  try {
    await updateLineItem({
      request,
      lineId: formData.get("lineId") as string,
      quantity: Number.parseInt((formData.get("quantity") as string) ?? "", 10),
    });
    return new Response(null, { status: 200 });
  } catch (error: any) {
    console.error("Error updating line item:", error);
    return new Response("Error updating quantity", { status: 500 });
  }
};
