import { Suspense } from "react";

import type { StoreRegion } from "@medusajs/types";
import LocalizedClientLink from "@/modules/common/components/localized-client-link";
import CartButton from "@/modules/layout/components/cart-button";
import SideMenu from "@/modules/layout/components/side-menu";

export default function Nav({ regions }: { regions: StoreRegion[] }) {
  const logoUrl = "https://firebasestorage.googleapis.com/v0/b/shopable-60057.firebasestorage.app/o/stores%2Fac031f19-5e6d-4657-9b71-4eaa2ba74658%2Fimages%2Fgenerated-072dd057-52ad-4580-a87a-1c5f9d19b659.png?alt=media";
  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto border-b duration-200 bg-ui-bg-base border-ui-border-base">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu regions={regions} />
            </div>
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
              data-testid="nav-store-link"
            >
              {/* Shopable Store */}
              <img src={logoUrl} alt="Pet Store Logo" className="h-10 object-contain" />
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink className="hover:text-ui-fg-base" href="/account" data-testid="nav-account-link">
                Account
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-ui-fg-base flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  );
}