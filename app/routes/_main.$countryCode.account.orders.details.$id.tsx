import type { Route } from "./+types/_main.$countryCode.account.orders.details.$id";
import { useLoaderData } from "@remix-run/node";
import { retrieveOrder } from "@/lib/data/orders.server";
import OrderDetailsTemplate from "@/modules/order/templates/order-details-template";

export const meta: Route.MetaFunction = ({ data: { order } }) => [
  {
    title: `Order #${order.display_id}`,
    description: "View your order",
  },
];

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const order = await retrieveOrder(request, params.id).catch(() => null);
  if (!order) {
    throw new Response("Not Found", { status: 404 });
  }

  return { order };
};
export default function AccountProfile() {
  const { order } = useLoaderData<typeof loader>();

  return <OrderDetailsTemplate order={order} />;
}
