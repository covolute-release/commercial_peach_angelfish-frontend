import { sdk } from "@/lib/config";
import { sortProducts } from "@/lib/util/sort-products";
import type { HttpTypes } from "@medusajs/types";
import type { SortOptions } from "@/modules/store/components/sort-products";
import { getAuthHeaders } from "./cookies.server";
import { getRegion, retrieveRegion } from "./regions.server";

export const PRODUCT_LIMIT = 12;

type PaginatedProductsParams = {
  limit: number;
  collection_id?: string[];
  category_id?: string[];
  id?: string[];
  order?: string;
};

export const listProducts = async ({
  request,
  pageParam = 1,
  queryParams,
  countryCode,
  regionId,
}: {
  request: Request;
  pageParam?: number;
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams;
  countryCode?: string;
  regionId?: string;
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number };
  nextPage: number | null;
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams;
}> => {
  if (!countryCode && !regionId) {
    throw new Error("Country code or region ID is required");
  }

  const limit = queryParams?.limit || 12;
  const _pageParam = Math.max(pageParam, 1);
  const offset = _pageParam === 1 ? 0 : (_pageParam - 1) * limit;

  let region: HttpTypes.StoreRegion | undefined | null;

  if (countryCode) {
    region = await getRegion(countryCode);
  } else {
    region = await retrieveRegion(regionId!);
  }

  if (!region) {
    return {
      response: { products: [], count: 0 },
      nextPage: null,
    };
  }

  const headers = {
    ...(await getAuthHeaders(request)),
  };

  return sdk.client
    .fetch<{ products: HttpTypes.StoreProduct[]; count: number }>("/store/products", {
      method: "GET",
      query: {
        limit,
        offset,
        region_id: region?.id,
        fields: "*variants.calculated_price,+variants.inventory_quantity,+metadata,+tags",
        ...queryParams,
      },
      headers,
      cache: "no-cache",
    })
    .then(({ products, count }) => {
      const nextPage = count > offset + limit ? pageParam + 1 : null;

      return {
        response: {
          products,
          count,
        },
        nextPage: nextPage,
        queryParams,
      };
    });
};

/**
 * This will fetch 100 products to the Next.js cache and sort them based on the sortBy parameter.
 * It will then return the paginated products based on the page and limit parameters.
 */
export const listProductsWithSort = async ({
  request,
  countryCode,
  collectionId,
  categoryId,
  productsIds,
}: {
  request: Request;
  countryCode: string;
  collectionId?: string;
  categoryId?: string;
  productsIds?: string[];
}): Promise<{
  response: {
    products: HttpTypes.StoreProduct[];
    count: number;
    limit: number;
    page: number;
  };
  nextPage: number | null;
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams;
}> => {
  const searchParams = new URL(request.url).searchParams;
  const sortBy = (searchParams.get("sortBy") || "created_at") as SortOptions;

  const pageParsed = Number.parseInt(searchParams.get("page") || "1", 10);
  const pageNumber = Number.isNaN(pageParsed) ? 1 : pageParsed;
  const limitParsed = Number.parseInt(searchParams.get("limit") || PRODUCT_LIMIT.toString(), 10);
  const limit = Math.min(Number.isNaN(limitParsed) ? PRODUCT_LIMIT : limitParsed, 100);

  const queryParams: PaginatedProductsParams = {
    limit: PRODUCT_LIMIT,
  };

  if (collectionId) {
    queryParams.collection_id = [collectionId];
  }

  if (categoryId) {
    queryParams.category_id = [categoryId];
  }

  if (productsIds) {
    queryParams.id = productsIds;
  }

  if (sortBy === "created_at") {
    queryParams.order = "created_at";
  }

  const {
    response: { products, count },
  } = await listProducts({
    request,
    pageParam: 0,
    queryParams: {
      ...queryParams,
      limit: 100,
    },
    countryCode,
  });

  const sortedProducts = sortProducts(products, sortBy);

  const pageParam = (pageNumber - 1) * limit;

  const nextPage = count > pageParam + limit ? pageParam + limit : null;

  const paginatedProducts = sortedProducts.slice(pageParam, pageParam + limit);

  return {
    response: {
      products: paginatedProducts,
      count,
      limit,
      page: pageNumber,
    },
    nextPage,
    queryParams,
  };
};

export type ListProductsWithSort = ReturnType<typeof listProductsWithSort>;

export const listRelatedProducts = async ({
  request,
  region,
  product,
  countryCode,
}: {
  request: Request;
  region: HttpTypes.StoreRegion;
  product: HttpTypes.StoreProduct;
  countryCode: string;
}) => {
  const queryParams: HttpTypes.StoreProductParams = {};
  if (region?.id) {
    queryParams.region_id = region.id;
  }
  if (product.collection_id) {
    queryParams.collection_id = [product.collection_id];
  }
  if (product.tags) {
    queryParams.tag_id = product.tags.map((t) => t.id).filter(Boolean) as string[];
  }
  queryParams.is_giftcard = false;

  return await listProducts({
    request,
    queryParams,
    countryCode,
  }).then(({ response }) => {
    return response.products.filter((responseProduct) => responseProduct.id !== product.id);
  });
};

export type ListRelatedProducts = ReturnType<typeof listRelatedProducts>;
