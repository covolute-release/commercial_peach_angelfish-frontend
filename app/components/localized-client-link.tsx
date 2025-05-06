import { Link as RemixLink, type LinkProps as RemixLinkProps, useParams } from "@remix-run/react";
import type { To } from "@remix-run/router"; // Using To from @remix-run/router for type safety

interface LocalizedClientLinkProps extends Omit<RemixLinkProps, "to"> {
  to: To | string; // Allow string for convenience, RemixLinkProps['to'] is To
  children: React.ReactNode;
  className?: string;
}

/**
 * A wrapper around Remix's Link component that ensures generated URLs
 * are correctly prefixed with the current countryCode from the route parameters.
 * It primarily targets absolute paths (e.g., "/products") to ensure they become
 * "/:countryCode/products". Relative paths are handled by Remix's Link itself.
 */
export function LocalizedClientLink({
  to,
  children,
  className,
  ...props
}: LocalizedClientLinkProps) {
  const { countryCode } = useParams(); // countryCode is expected to be available from the URL

  let finalTo: To | string = to;

  if (countryCode) {
    if (typeof to === 'string') {
      // Handle absolute paths: if it starts with '/' but not with '/:countryCode'
      if (to.startsWith('/') && !to.startsWith(`/${countryCode}/`) && to !== `/${countryCode}`) {
        finalTo = `/${countryCode}${to === '/' ? '' : to}`; // Ensure to="/" becomes /:countryCode
      }
      // Relative paths (e.g., "subpath", "../other") and external links (http/https/mailto/tel) are passed as-is.
      // Remix's Link component handles relative paths correctly based on the current route context.
    } else if (typeof to === 'object' && to !== null && 'pathname' in to && typeof to.pathname === 'string') {
      // Handle 'to' as an object: { pathname, search, hash }
      let newPathname = to.pathname;
      if (newPathname.startsWith('/') && !newPathname.startsWith(`/${countryCode}/`) && newPathname !== `/${countryCode}`) {
        newPathname = `/${countryCode}${newPathname === '/' ? '' : newPathname}`;
      }
      finalTo = { ...to, pathname: newPathname };
    }
  } else if (import.meta.env.DEV) {
    console.warn(`LocalizedClientLink: 'countryCode' is undefined. Linking to:`, to, `This might lead to incorrect URLs if 'to' is an absolute path not intended for the root.`);
  }

  return (
    <RemixLink to={finalTo} className={className} {...props}>
      {children}
    </RemixLink>
  );
}