import type { Route } from "./+types/_main.$countryCode._index";

import FeaturedProducts from "@/modules/home/components/featured-products";
import Hero from "@/modules/home/components/hero";
import { listCollections } from "@/lib/data/collections.server";
import { getRegion } from "@/lib/data/regions.server";
import { useLoaderData } from "@remix-run/node";
import { listProducts } from "@/lib/data/products.server";

export const meta: Route.MetaDescriptors = [
  {
    title: "Petopia - Awesome Goods for Your Awesome Pets!",
    description: "Discover a wide range of pet supplies, toys, food, and accessories at Petopia. Everything your furry, scaly, or feathery friend needs!",
  },
];

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { countryCode } = params;

  if (!countryCode) {
    throw new Error("Country code is required");
  }

  const region = await getRegion(countryCode);

  if (!region) {
    throw new Error("Region not found");
  }

  const { collections } = await listCollections({
    fields: "id, handle, title",
  });

  if (!collections) {
    throw new Error("Collections not found");
  }

  const products = Object.fromEntries(
    await Promise.all(
      collections.map(async (collection) => {
        const {
          response: { products: pricedProducts },
        } = await listProducts({
          request,
          regionId: region.id,
          queryParams: {
            collection_id: collection.id,
            fields: "*variants.calculated_price",
          },
        });

        return [collection.id, pricedProducts] as const;
      }),
    ),
  );

  return { collections, region, products };
};

export default function Home() {
  const { collections, region, products } = useLoaderData<typeof loader>();

  if (!collections || !region) {
    return null;
  }

  return (
    <>
      <Hero />
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} products={products} />
        </ul>
      </div>
    </>
  );
}