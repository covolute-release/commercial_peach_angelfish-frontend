import type { SortOptions } from "@/modules/store/components/sort-products";
import type { Route } from "./+types/_main.$countryCode.collections.$handle";
import { getCollectionByHandle } from "@/lib/data/collections.server";
import { listProductsWithSort } from "@/lib/data/products.server";
import CollectionTemplate from "@/modules/collections/templates";
import { useLoaderData } from "@remix-run/node";

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const searchParams = new URL(request.url).searchParams;
  const sortBy = searchParams.get("sortBy") as SortOptions | undefined;
  const collection = await getCollectionByHandle(params.handle);
  if (!collection) {
    throw new Response("Not Found", { status: 404 });
  }

  return {
    collection,
    sortBy,
    products: listProductsWithSort({
      request,
      countryCode: params.countryCode,
      collectionId: collection.id,
    }),
  };
};

export const meta: Route.MetaFunction = ({ data }) => {
  const { collection } = data;

  return [
    {
      title: `${collection.title} | Medusa Store`,
      description: `${collection.title} collection.`,
    },
  ];
};

export default function CollectionPage() {
  const { collection, sortBy, products } = useLoaderData<typeof loader>();

  return <CollectionTemplate collection={collection} sortBy={sortBy} products={products} />;
}
