import { sdk } from "@/lib/config";
import medusaError from "@/lib/util/medusa-error";
import type { HttpTypes } from "@medusajs/types";

export const listRegions = async () => {
  return sdk.client
    .fetch<{ regions: HttpTypes.StoreRegion[] }>("/store/regions", {
      method: "GET",
      cache: "force-cache",
    })
    .then(({ regions }) => regions)
    .catch(medusaError);
};

export const retrieveRegion = async (id: string) => {
  return sdk.client
    .fetch<{ region: HttpTypes.StoreRegion }>(`/store/regions/${id}`, {
      method: "GET",
      cache: "force-cache",
    })
    .then(({ region }) => region)
    .catch(medusaError);
};

const regionMap = new Map<string, HttpTypes.StoreRegion>();

export const getRegion = async (countryCode: string) => {
  try {
    if (regionMap.has(countryCode)) {
      return regionMap.get(countryCode);
    }

    const regions = await listRegions();

    if (!regions) {
      return null;
    }

    regions.forEach((region) => {
      region.countries?.forEach((c) => {
        regionMap.set(c?.iso_2 ?? "", region);
      });
    });

    const region = countryCode ? regionMap.get(countryCode) : regionMap.get("us");

    return region;
  } catch (_e: any) {
    return null;
  }
};

export type GetRegion = ReturnType<typeof getRegion>;
