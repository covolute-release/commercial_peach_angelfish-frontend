import { Outlet, redirect } from "@remix-run/node";
import { Toaster } from "@/components/toaster";
import AccountLayout from "@/modules/account/templates/account-layout";
import type { Route } from "./+types/_main.$countryCode.auth";
import { retrieveCustomer } from "@/lib/data/customer.server";

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const customer = await retrieveCustomer(request);
  if (customer) {
    console.log(request.url);
    return redirect(`/${params.countryCode}/account/overview`);
  }

  return null;
};

export default function AccountPageLayout() {
  return (
    <AccountLayout customer={null}>
      <Outlet />
      <Toaster />
    </AccountLayout>
  );
}
