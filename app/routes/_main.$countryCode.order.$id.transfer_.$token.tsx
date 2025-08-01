import { Heading } from "@/components/heading";
import { Text } from "@/components/text";
import TransferActions from "@/modules/order/components/transfer-actions";
import TransferImage from "@/modules/order/components/transfer-image";
import type { Route } from "./+types/_main.$countryCode.order.$id.transfer_.$token";
import { useLoaderData } from "@remix-run/node";

export const loader = ({ params }: Route.LoaderArgs) => params;

export default function TransferPage() {
  const { id, token } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col gap-y-4 items-start w-2/5 mx-auto mt-30 mb-20">
      <TransferImage />
      <div className="flex flex-col gap-y-6">
        <Heading level="h1" className="text-xl text-zinc-900">
          Transfer request for order {id}
        </Heading>
        <Text className="text-zinc-600">
          You&#39;ve received a request to transfer ownership of your order ({id}). If you agree to this request, you
          can approve the transfer by clicking the button below.
        </Text>
        <div className="w-full h-px bg-zinc-200" />
        <Text className="text-zinc-600">
          If you accept, the new owner will take over all responsibilities and permissions associated with this order.
        </Text>
        <Text className="text-zinc-600">
          If you do not recognize this request or wish to retain ownership, no further action is required.
        </Text>
        <div className="w-full h-px bg-zinc-200" />
        <TransferActions id={id} token={token} />
      </div>
    </div>
  );
}
