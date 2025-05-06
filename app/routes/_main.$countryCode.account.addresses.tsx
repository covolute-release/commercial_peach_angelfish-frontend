import type { Route } from "./+types/_main.$countryCode.account.addresses";
import { redirect, useLoaderData } from "@remix-run/node";
import { getRegion } from "@/lib/data/regions.server";
import AddressBook from "@/modules/account/components/address-book";
import { retrieveCustomer } from "@/lib/data/customer.server";

export const meta: Route.MetaDescriptors = [
  {
    title: "Addresses",
    description: "View your addresses",
  },
];

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const [region, customer] = await Promise.all([getRegion(params.countryCode), retrieveCustomer(request)]);

  if (!region) {
    throw new Response("Region not found", { status: 404 });
  }

  if (!customer) {
    return redirect(`/${params.countryCode}/auth/signin`);
  }

  return { region, customer };
};

export default function AccountProfile() {
  const { region, customer } = useLoaderData<typeof loader>();

  return (
    <div className="w-full" data-testid="addresses-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Shipping Addresses</h1>
        <p className="text-base-regular">
          View and update your shipping addresses, you can add as many as you like. Saving your addresses will make them
          available during checkout.
        </p>
      </div>
      <AddressBook customer={customer} region={region} />
    </div>
  );
}
