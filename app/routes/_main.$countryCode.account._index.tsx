import type { Route } from "./+types/_main.$countryCode.account._index";
import { redirect } from "@remix-run/node";

export const loader = async ({ params }: Route.LoaderArgs) => {
  return redirect(`/${params.countryCode}/account/overview`);
};
