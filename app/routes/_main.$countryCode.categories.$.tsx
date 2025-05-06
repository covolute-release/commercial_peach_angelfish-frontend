import { getCategoryByHandle } from "@/lib/data/categories";
import type { Route } from "./+types/_main.$countryCode.categories.$";
import { useLoaderData } from "@remix-run/node";
import CategoryTemplate from "@/modules/categories/templates";
import { listProductsWithSort } from "@/lib/data/products.server";
import type { SortOptions } from "@/modules/store/components/sort-products";

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const searchParams = new URL(request.url).searchParams;
  const sortBy = searchParams.get("sortBy") as SortOptions | undefined;
  const productCategory = await getCategoryByHandle(params["*"]);
  if (!productCategory) {
    throw new Response("Not Found", { status: 404 });
  }

  return {
    productCategory,
    sortBy,
    products: listProductsWithSort({
      request,
      countryCode: params.countryCode,
      categoryId: productCategory.id,
    }),
  };
};

export const meta: Route.MetaFunction = ({ data }) => {
  const { productCategory } = data;

  return [
    {
      title: `${productCategory.name} | Medusa Store`,
      description: `${productCategory.name} category.`,
    },
  ];
};

export default function CategoryPage() {
  const { productCategory, sortBy, products } = useLoaderData<typeof loader>();

  return <CategoryTemplate category={productCategory} sortBy={sortBy} products={products} />;
}
