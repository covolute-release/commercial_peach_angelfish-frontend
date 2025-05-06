import { Suspense, useMemo } from "react";

import InteractiveLink from "@/modules/common/components/interactive-link";
import SkeletonProductGrid from "@/modules/skeletons/templates/skeleton-product-grid";
import RefinementList from "@/modules/store/components/refinement-list";
import type { SortOptions } from "@/modules/store/components/sort-products";
import PaginatedProducts from "@/modules/store/paginated-products";
import LocalizedClientLink from "@/modules/common/components/localized-client-link";
import type { HttpTypes } from "@medusajs/types";
import type { ListProductsWithSort } from "@/lib/data/products.server";

export default function CategoryTemplate({
  category,
  sortBy,
  products,
}: {
  category: HttpTypes.StoreProductCategory;
  sortBy?: SortOptions;
  products: ListProductsWithSort;
}) {
  const sort = sortBy || "created_at";

  const parents = useMemo(() => {
    const parents = [] as HttpTypes.StoreProductCategory[];
    const getParents = (category: HttpTypes.StoreProductCategory) => {
      if (category.parent_category) {
        parents.push(category.parent_category);
        getParents(category.parent_category);
      }
    };
    getParents(category);
    return parents;
  }, [category]);

  return (
    <div
      className="flex flex-col small:flex-row small:items-start py-6 content-container"
      data-testid="category-container"
    >
      <RefinementList sortBy={sort} data-testid="sort-by-container" />
      <div className="w-full">
        <div className="flex flex-row mb-8 text-2xl-semi gap-4">
          {parents?.map((parent) => (
            <span key={parent.id} className="text-ui-fg-subtle">
              <LocalizedClientLink
                className="mr-4 hover:text-black"
                href={`/categories/${parent.handle}`}
                data-testid="sort-by-link"
              >
                {parent.name}
              </LocalizedClientLink>
              /
            </span>
          ))}
          <h1 data-testid="category-page-title">{category.name}</h1>
        </div>
        {category.description && (
          <div className="mb-8 text-base-regular">
            <p>{category.description}</p>
          </div>
        )}
        {category.category_children && (
          <div className="mb-8 text-base-large">
            <ul className="grid grid-cols-1 gap-2">
              {category.category_children?.map((c) => (
                <li key={c.id}>
                  <InteractiveLink href={`/categories/${c.handle}`}>{c.name}</InteractiveLink>
                </li>
              ))}
            </ul>
          </div>
        )}
        <Suspense fallback={<SkeletonProductGrid numberOfProducts={category.products?.length ?? 8} />}>
          <PaginatedProducts products={products} />
        </Suspense>
      </div>
    </div>
  );
}
