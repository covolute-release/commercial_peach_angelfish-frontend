import { sdk } from "@/lib/config";
import type { HttpTypes } from "@medusajs/types";

export const listCategories = async (query?: Record<string, any>) => {
  const limit = query?.limit || 100;

  return sdk.client
    .fetch<{ product_categories: HttpTypes.StoreProductCategory[] }>("/store/product-categories", {
      query: {
        fields: "*category_children, *products, *parent_category, *parent_category.parent_category",
        limit,
        ...query,
      },
      cache: "force-cache",
    })
    .then(({ product_categories }) => product_categories);
};

export const getCategoryByHandle = async (handle: string) => {
  return sdk.client
    .fetch<HttpTypes.StoreProductCategoryListResponse>("/store/product-categories", {
      query: {
        fields: "*category_children, *products",
        handle,
      },
      cache: "force-cache",
    })
    .then(({ product_categories }) => product_categories[0]);
};
