import { Outlet, redirect, useLoaderData } from "@remix-run/node";
import { Toaster } from "@/components/toaster";
import AccountLayout from "@/modules/account/templates/account-layout";
import type { Route } from "./+types/_main.$countryCode.account";
import { retrieveCustomer } from "@/lib/data/customer.server";

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const customer = await retrieveCustomer(request);
  if (!customer) {
    throw redirect(`/${params.countryCode}/auth/signin`);
  }

  return { customer };
};

export default function AccountPageLayout() {
  const { customer } = useLoaderData<typeof loader>();

  return (
    <AccountLayout customer={customer}>
      <Outlet />
      <Toaster />
    </AccountLayout>
  );
}
