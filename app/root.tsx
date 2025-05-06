import { isRouteErrorResponse, Link, Links, Meta, Outlet, redirect, Scripts, ScrollRestoration } from "@remix-run/node";
import { Text } from "@/components/text";

import type { Route } from "./+types/root";
import { DEFAULT_REGION, getCountryCode, getRegionMap } from "./utils/regions";
import { ArrowUpRightMini } from "@medusajs/icons";
import globalStylesheet from "./styles/globals.css?url";
import readonlyStylesheet from "./styles/readonly.css?url";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { logServerError } from "./lib/error-process-server";
import { reportClientError } from "./lib/error-process-client";

export const links: Route.LinksFunction = () => [
  { rel: "stylesheet", href: globalStylesheet },
  { rel: "stylesheet", href: readonlyStylesheet },
  { rel: "icon", href: "/favicon.ico" }, // Consider updating favicon later
];

export const meta: Route.MetaDescriptors = [
  {
    title: "Petopia - Your Friendly Pet Store",
  },
];

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const search = url.search;
  const protocol = request.headers.get("x-forwarded-proto") || url.protocol;
  const host = request.headers.get("x-forwarded-host") || url.host;
  const origin = `${protocol + protocol.endsWith(":") ? "" : ":"}//${host}`;

  if (pathname.includes(".") && !pathname.endsWith(".html")) {
    return null;
  }

  try {
    const regionMap = await getRegionMap();

    if (!regionMap || regionMap.size === 0) {
      console.error("Cannot proceed without region map.");
      return { countryCode: DEFAULT_REGION, regionMap };
    }

    const countryCode = await getCountryCode(request, regionMap);

    if (!countryCode) {
      console.error("Could not determine country code.");
      throw new Error("Failed to determine a valid country code.");
    }

    const urlHasCountryCode = pathname.toLowerCase().startsWith(`/${countryCode}`);

    // Case 1: Correct country code in URL -> Proceed
    if (urlHasCountryCode) {
      return { countryCode, regionMap }; // Pass data down
    }

    // Case 3: Incorrect or missing country code in URL -> Redirect to correct URL
    if (!urlHasCountryCode) {
      const correctPathname = `/${countryCode}${pathname === "/" ? "" : pathname}`;
      const redirectUrl = `${origin}${correctPathname}${search}`;

      return redirect(redirectUrl, { status: 307 });
    }

    return { countryCode, regionMap }; // Proceed
  } catch (error) {
    console.error("Error in root loader:", error);
    // Re-throw the error so the ErrorBoundary catches it
    throw error;
  }
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {import.meta.env.DEV && <script crossOrigin="anonymous" src="//unpkg.com/shopable-scan/dist/auto.global.js" />}
      </head>
      <body>
        <TooltipProvider>{children}</TooltipProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let _message = "Oops!";
  let details = "An unexpected error occurred.";
  let _stack: string | undefined;

  if (SHOPABLE_DEV_SERVER === 'true' && import.meta.env.DEV) {
    if (typeof window === "undefined") {
      logServerError(error);
    } else {
      reportClientError(error);
    }
  }

  if (isRouteErrorResponse(error)) {
    _message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    _stack = error.stack;
  }

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-64px)]">
      <h1 className="text-2xl-semi text-ui-fg-base">{_message}</h1>
      <p className="text-small-regular text-ui-fg-base">{details}</p>
      <Link className="flex gap-x-1 items-center group" to="/">
        <Text className="text-ui-fg-interactive">Go to frontpage</Text>
        <ArrowUpRightMini className="group-hover:rotate-45 ease-in-out duration-150" color="var(--fg-interactive)" />
      </Link>
      {_stack && (
        <pre className="text-small-regular text-ui-fg-muted max-w-[600px] overflow-x-auto">
          {import.meta.env.DEV ? _stack : "Stack trace is hidden in production."}
        </pre>
      )}
    </div>
  );
}