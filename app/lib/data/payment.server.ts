import { sdk } from "@/lib/config";
import { getAuthHeaders } from "./cookies.server";
import type { HttpTypes } from "@medusajs/types";

export const listCartPaymentMethods = async (request: Request, regionId: string) => {
  const headers = {
    ...(await getAuthHeaders(request)),
  };

  return sdk.client
    .fetch<HttpTypes.StorePaymentProviderListResponse>("/store/payment-providers", {
      method: "GET",
      query: { region_id: regionId },
      headers,
      cache: "force-cache",
    })
    .then(({ payment_providers }) =>
      payment_providers.sort((a, b) => {
        return a.id > b.id ? 1 : -1;
      }),
    )
    .catch(() => {
      return null;
    });
};
