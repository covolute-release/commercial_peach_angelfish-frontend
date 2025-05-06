import { Text } from "@/components/text";
import { Heading } from "@/components/heading";
import { Input } from "@/components/input";
import { IconButton } from "@/components/icon-button";
import { SubmitButton } from "@/modules/checkout/components/submit-button";
import { CheckCircleMiniSolid, XCircleSolid } from "@medusajs/icons";
import { useEffect, useState } from "react";
import { useFetcher } from "@remix-run/node";

export default function TransferRequestForm() {
  const fetcher = useFetcher();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (fetcher.data?.success && fetcher.state === "idle") {
      setShowSuccess(true);
    }
  }, [fetcher.data?.success, fetcher.state]);

  return (
    <div className="flex flex-col gap-y-4 w-full">
      <div className="grid sm:grid-cols-2 items-center gap-x-8 gap-y-4 w-full">
        <div className="flex flex-col gap-y-1">
          <Heading level="h3" className="text-lg text-neutral-950">
            Order transfers
          </Heading>
          <Text className="text-base-regular text-neutral-500">
            Can&apos;t find the order you are looking for?
            <br /> Connect an order to your account.
          </Text>
        </div>
        <fetcher.Form action="/account/order/transfer" method="post" className="flex flex-col gap-y-1 sm:items-end">
          <div className="flex flex-col gap-y-2 w-full">
            <Input className="w-full" name="order_id" placeholder="Order ID" />
            <SubmitButton variant="secondary" className="w-fit whitespace-nowrap self-end">
              Request transfer
            </SubmitButton>
          </div>
        </fetcher.Form>
      </div>
      {fetcher.data?.success === false && fetcher.data?.error && (
        <Text className="text-base-regular text-rose-500 text-right">{fetcher.data?.error}</Text>
      )}
      {showSuccess && (
        <div className="flex justify-between p-4 bg-neutral-50 shadow-borders-base w-full self-stretch items-center">
          <div className="flex gap-x-2 items-center">
            <CheckCircleMiniSolid className="w-4 h-4 text-emerald-500" />
            <div className="flex flex-col gap-y-1">
              <Text className="text-medim-pl text-neutral-950">
                Transfer for order {fetcher.data?.order?.id} requested
              </Text>
              <Text className="text-base-regular text-neutral-600">
                Transfer request email sent to {fetcher.data?.order?.email}
              </Text>
            </div>
          </div>
          <IconButton variant="transparent" className="h-fit" onClick={() => setShowSuccess(false)}>
            <XCircleSolid className="w-4 h-4 text-neutral-500" />
          </IconButton>
        </div>
      )}
    </div>
  );
}
