import { listProductsWithSort } from "@/lib/data/products.server";
import type { Route } from "./+types/_main.$countryCode.store";

import type { SortOptions } from "@/modules/store/components/sort-products";
import StoreTemplate from "@/modules/store/templates";
import { useLoaderData } from "@remix-run/node";

export const meta: Route.MetaDescriptors = [
  {
    title: "Store",
    description: "Explore all of our products.",
  },
];

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { countryCode } = params;

  const searchParams = new URL(request.url).searchParams;
  const sortBy = searchParams.get("sortBy") as SortOptions | undefined;

  const products = listProductsWithSort({
    request,
    countryCode,
  });

  return { sortBy, products };
};

export default function StorePage() {
  const { sortBy, products } = useLoaderData<typeof loader>();

  return <StoreTemplate sortBy={sortBy} products={products} />;
}
