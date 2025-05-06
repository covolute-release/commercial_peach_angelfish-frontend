import { deleteLineItem } from "@/lib/data/cart.server";
import type { Route } from "./+types/delete.line.item";

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  await deleteLineItem(request, formData.get("id") as string);
  return new Response("OK", { status: 200 });
};
