import type { ListProductsWithSort } from "@/lib/data/products.server";
import VisibilityTracker from "@/modules/llm/VisibilityTracker";
import ProductPreview from "@/modules/products/components/product-preview";
import { Pagination } from "@/modules/store/components/pagination";
import { use } from "react";

export default function PaginatedProducts({
  products: productsPromise,
}: {
  products: ListProductsWithSort;
}) {
  const products = use(productsPromise);

  const totalPages = Math.ceil(products.response.count / products.response.limit);

  return (
    <>
      <ul
        className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8"
        data-testid="products-list"
      >
        {products.response.products.map((p) => {
          return (
            <VisibilityTracker type="product" identifier={p.id} key={p.id}>
              <li>
                <ProductPreview product={p} />
              </li>
            </VisibilityTracker>
          );
        })}
      </ul>
      {totalPages > 1 && (
        <Pagination data-testid="product-pagination" page={products.response.page} totalPages={totalPages} />
      )}
    </>
  );
}
