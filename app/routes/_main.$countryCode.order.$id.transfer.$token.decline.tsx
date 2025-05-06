import { Heading } from "@/components/heading";
import { Text } from "@/components/text";
import TransferImage from "@/modules/order/components/transfer-image";
import type { Route } from "./+types/_main.$countryCode.order.$id.transfer.$token.decline";
import { useLoaderData } from "@remix-run/node";
import { declineTransferRequest } from "@/lib/data/orders.server";

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { success, error } = await declineTransferRequest(request, params.id, params.token);

  return { id: params.id, success, error };
};

export default function TransferPage() {
  const { id, success, error } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col gap-y-4 items-start w-2/5 mx-auto mt-10 mb-20">
      <TransferImage />
      <div className="flex flex-col gap-y-6">
        {success && (
          <>
            <Heading level="h1" className="text-xl text-zinc-900">
              Order transfer declined!
            </Heading>
            <Text className="text-zinc-600">Transfer of order {id} has been successfully declined.</Text>
          </>
        )}
        {!success && (
          <>
            <Text className="text-zinc-600">There was an error declining the transfer. Please try again.</Text>
            {error && <Text className="text-red-500">Error message: {error}</Text>}
          </>
        )}
      </div>
    </div>
  );
}
