import { Text } from "@/components/text";
import { cn } from "@/lib/utils";

import LocalizedClientLink from "@/modules/common/components/localized-client-link";
import { useLoaderData } from "@remix-run/node";
import type { loader } from "@/routes/_main";
// MedusaCTA removed

export default function Footer() {
  const { collections, categories: productCategories } = useLoaderData<typeof loader>();
  const logoUrl = "https://firebasestorage.googleapis.com/v0/b/shopable-60057.firebasestorage.app/o/stores%2Fac031f19-5e6d-4657-9b71-4eaa2ba74658%2Fimages%2Fgenerated-072dd057-52ad-4580-a87a-1c5f9d19b659.png?alt=media";

  return (
    <footer className="border-t border-ui-border-base w-full bg-ui-bg-subtle">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between py-40">
          <div>
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus text-ui-fg-subtle hover:text-ui-fg-base uppercase"
            >
              <img src={logoUrl} alt="Pet Store Logo" className="h-12 object-contain" />
            </LocalizedClientLink>
            <Text className="txt-compact-small text-ui-fg-subtle mt-2">Template by Shopable</Text>
          </div>
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-2">
            {" "}
            {/* Adjusted grid columns */}
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus txt-ui-fg-base">Categories</span>
                <ul className="grid grid-cols-1 gap-2" data-testid="footer-categories">
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return;
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null;

                    return (
                      <li className="flex flex-col gap-2 text-ui-fg-subtle txt-small" key={c.id}>
                        <LocalizedClientLink
                          className={cn("hover:text-ui-fg-base", children && "txt-small-plus")}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children?.map((child) => (
                              <li key={child.id}>
                                <LocalizedClientLink
                                  className="hover:text-ui-fg-base"
                                  href={`/categories/${child.handle}`}
                                  data-testid="category-link"
                                >
                                  {child.name}
                                </LocalizedClientLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus txt-ui-fg-base">Collections</span>
                <ul
                  className={cn("grid grid-cols-1 gap-2 text-ui-fg-subtle txt-small", {
                    "grid-cols-2": (collections?.length || 0) > 3,
                  })}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink className="hover:text-ui-fg-base" href={`/collections/${c.handle}`}>
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Medusa column removed */}
          </div>
        </div>
        <div className="flex w-full mb-16 justify-between text-ui-fg-muted">
          <Text className="txt-compact-small">© {new Date().getFullYear()} Petopia. All rights reserved.</Text>
          {/* MedusaCTA removed */}
        </div>
      </div>
    </footer>
  );
}