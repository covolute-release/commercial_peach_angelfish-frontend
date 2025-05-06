import type { Route } from "./+types/_main.$countryCode.auth_.signout";
import { signout } from "@/lib/data/customer.server";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const responseHeaders = new Headers();
  responseHeaders.append("Location", `/${params.countryCode}`);
  await signout(responseHeaders, params.countryCode);
  return new Response(null, {
    status: 302,
    headers: responseHeaders,
  });
};
