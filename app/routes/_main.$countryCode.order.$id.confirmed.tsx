import type { Route } from "./+types/_main.$countryCode.order.$id.confirmed";
import { retrieveOrder } from "@/lib/data/orders.server";
import { Suspense } from "react";
import OrderCompletedTemplate from "@/modules/order/templates/order-completed-template";
import SkeletonOrderConfirmed from "@/modules/skeletons/templates/skeleton-order-confirmed";
import { useLoaderData } from "@remix-run/node";

export const meta: Route.MetaDescriptors = [
  {
    title: "Order Confirmed",
    description: "You purchase was successful",
  },
];

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const order = retrieveOrder(request, params.id).catch(() => null);

  return { order };
};

export default function OrderConfirmed() {
  const { order } = useLoaderData<typeof loader>();

  return (
    <Suspense fallback={<SkeletonOrderConfirmed />}>
      <OrderCompletedTemplate order={order} />
    </Suspense>
  );
}
