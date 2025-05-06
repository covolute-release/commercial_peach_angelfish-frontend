import ProductTemplate from "@/modules/products/templates";
import { getRegion } from "@/lib/data/regions.server";
import type { Route } from "./+types/_main.$countryCode.products.$handle";
import { listProducts, listRelatedProducts } from "@/lib/data/products.server";
import { useLoaderData } from "@remix-run/node";

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const region = await getRegion(params.countryCode);
  if (!region) {
    throw new Response("Not Found", { status: 404 });
  }

  const product = await listProducts({
    request,
    countryCode: params.countryCode,
    queryParams: { handle: params.handle },
  }).then(({ response }) => response.products[0]);
  if (!product) {
    throw new Response("Not Found", { status: 404 });
  }

  return {
    product,
    region,
    relatedProducts: listRelatedProducts({
      request,
      product,
      region,
      countryCode: params.countryCode,
    }),
  };
};

export const meta: Route.MetaFunction = ({ data }) => {
  const { product } = data;

  return [
    {
      title: `${product.title} | Medusa Store`,
      description: `${product.title}`,
      openGraph: {
        title: `${product.title} | Medusa Store`,
        description: `${product.title}`,
        images: product.thumbnail ? [product.thumbnail] : [],
      },
    },
  ];
};

export default function ProductPage() {
  const { product, region, relatedProducts } = useLoaderData<typeof loader>();

  return <ProductTemplate product={product} region={region} relatedProducts={relatedProducts} />;
}
