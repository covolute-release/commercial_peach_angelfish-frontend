import { listOrders } from "@/lib/data/orders.server";
import type { Route } from "./+types/_main.$countryCode.account.overview";
import Overview from "@/modules/account/components/overview";
import { redirect, useLoaderData } from "@remix-run/node";
import { retrieveCustomer } from "@/lib/data/customer.server";

export const meta: Route.MetaDescriptors = [
  {
    title: "Account",
    description: "Overview of your account activity.",
  },
];

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const [orders, customer] = await Promise.all([listOrders(request), retrieveCustomer(request)]);

  if (!customer) {
    return redirect(`/${params.countryCode}/auth/signin`);
  }

  return { orders, customer };
};

export default function AccountOverview() {
  const { customer, orders } = useLoaderData<typeof loader>();

  return <Overview customer={customer} orders={orders} />;
}
