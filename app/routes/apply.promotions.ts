import { applyPromotions } from "@/lib/data/cart.server";
import type { Route } from "./+types/apply.promotions";

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  try {
    await applyPromotions(request, formData.getAll("codes") as string[]);
    return new Response(null, { status: 200 });
  } catch (error: any) {
    console.error("Error applying promotions:", error);
    return new Response("Error applying promotions", { status: 500 });
  }
};
