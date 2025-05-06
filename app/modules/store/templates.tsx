import { Suspense } from "react";

import SkeletonProductGrid from "@/modules/skeletons/templates/skeleton-product-grid";
import RefinementList from "@/modules/store/components/refinement-list";
import type { SortOptions } from "@/modules/store/components/sort-products";

import PaginatedProducts from "./paginated-products";
import type { ListProductsWithSort } from "@/lib/data/products.server";

const StoreTemplate = ({
  sortBy,
  products,
}: {
  sortBy?: SortOptions;
  products: ListProductsWithSort;
}) => {
  const sort = sortBy || "created_at";

  return (
    <div
      className="flex flex-col small:flex-row small:items-start py-6 content-container"
      data-testid="category-container"
    >
      <RefinementList sortBy={sort} />
      <div className="w-full">
        <div className="mb-8 text-2xl-semi">
          <h1 data-testid="store-page-title">All products</h1>
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts products={products} />
        </Suspense>
      </div>
    </div>
  );
};

export default StoreTemplate;
