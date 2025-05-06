import type { Route } from "./+types/_main.$countryCode.account.addresses";
import { useLoaderData } from "@remix-run/node";
import { listOrders } from "@/lib/data/orders.server";
import OrderOverview from "@/modules/account/components/order-overview";
import Divider from "@/modules/common/components/divider";
import TransferRequestForm from "@/modules/account/components/transfer-request-form";

export const meta: Route.MetaDescriptors = [
  {
    title: "Orders",
    description: "Overview of your previous orders.",
  },
];

export const loader = async ({ request }: Route.LoaderArgs) => {
  const orders = await listOrders(request);
  return { orders };
};

export default function AccountProfile() {
  const { orders } = useLoaderData<typeof loader>();

  return (
    <div className="w-full" data-testid="orders-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Orders</h1>
        <p className="text-base-regular">
          View your previous orders and their status. You can also create returns or exchanges for your orders if
          needed.
        </p>
      </div>
      <div>
        <OrderOverview orders={orders} />
        <Divider className="my-16" />
        <TransferRequestForm />
      </div>
    </div>
  );
}
