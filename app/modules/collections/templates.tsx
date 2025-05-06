import { Suspense } from "react";

import SkeletonProductGrid from "@/modules/skeletons/templates/skeleton-product-grid";
import RefinementList from "@/modules/store/components/refinement-list";
import type { SortOptions } from "@/modules/store/components/sort-products";
import PaginatedProducts from "@/modules/store/paginated-products";
import type { HttpTypes } from "@medusajs/types";
import type { ListProductsWithSort } from "@/lib/data/products.server";

export default function CollectionTemplate({
  sortBy,
  collection,
  products,
}: {
  sortBy?: SortOptions;
  collection: HttpTypes.StoreCollection;
  products: ListProductsWithSort;
}) {
  const sort = sortBy || "created_at";

  return (
    <div className="flex flex-col small:flex-row small:items-start py-6 content-container">
      <RefinementList sortBy={sort} />
      <div className="w-full">
        <div className="mb-8 text-2xl-semi">
          <h1>{collection.title}</h1>
        </div>
        <Suspense fallback={<SkeletonProductGrid numberOfProducts={collection.products?.length} />}>
          <PaginatedProducts products={products} />
        </Suspense>
      </div>
    </div>
  );
}
