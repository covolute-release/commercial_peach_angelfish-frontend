import type { HttpTypes } from "@medusajs/types";
import ProductRail from "./product-rail";

export default function FeaturedProducts({
  collections,
  region,
  products,
}: {
  collections: HttpTypes.StoreCollection[];
  region: HttpTypes.StoreRegion;
  products: Record<string, HttpTypes.StoreProduct[]>;
}) {
  return collections.map((collection) => (
    <li key={collection.id}>
      <ProductRail collection={collection} region={region} products={products[collection.id]} />
    </li>
  ));
}
