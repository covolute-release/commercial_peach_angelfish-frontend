import type React from "react";
import { Suspense } from "react";

import ImageGallery from "@/modules/products/components/image-gallery";
import ProductActions from "@/modules/products/components/product-actions";
import ProductTabs from "@/modules/products/components/product-tabs";
import RelatedProducts from "@/modules/products/components/related-products";
import ProductInfo from "@/modules/products/product-info";
import SkeletonRelatedProducts from "@/modules/skeletons/templates/skeleton-related-products";
import type { HttpTypes } from "@medusajs/types";
import type { ListRelatedProducts } from "@/lib/data/products.server";

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct;
  region: HttpTypes.StoreRegion;
  relatedProducts: ListRelatedProducts;
};

const ProductTemplate: React.FC<ProductTemplateProps> = ({ product, region, relatedProducts }) => {
  return (
    <>
      <div
        className="content-container flex flex-col small:flex-row small:items-start py-6 relative"
        data-testid="product-container"
      >
        <div className="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-6">
          <ProductInfo product={product} />
          <ProductTabs product={product} />
        </div>
        <div className="block w-full relative">
          <ImageGallery images={product?.images || []} />
        </div>
        <div className="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-12">
          <ProductActions product={product} region={region} />
        </div>
      </div>
      <div className="content-container my-16 small:my-32" data-testid="related-products-container">
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts relatedProducts={relatedProducts} />
        </Suspense>
      </div>
    </>
  );
};

export default ProductTemplate;
