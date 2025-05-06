import { updateRegion } from "@/lib/data/cart.server";
import type { Route } from "./+types/update.region";

export const action = async ({ request }: Route.ActionArgs) => {
  const requestBody = await request.formData();
  const country = requestBody.get("country") as string;
  const currentPath = requestBody.get("currentPath") as string;
  return await updateRegion(request, country, currentPath);
};
