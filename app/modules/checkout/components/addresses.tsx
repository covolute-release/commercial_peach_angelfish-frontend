import compareAddresses from "@/lib/util/compare-addresses";
import { CheckCircleSolid } from "@medusajs/icons";
import type { HttpTypes } from "@medusajs/types";
import { Text } from "@/components/text";
import { Heading } from "@/components/heading";
import { useToggleState } from "@/hooks/use-toggle-state";
import Divider from "@/modules/common/components/divider";
import Spinner from "@/modules/common/icons/spinner";
import BillingAddress from "./billing_address";
import ErrorMessage from "./error-message";
import ShippingAddress from "./shipping-address";
import { SubmitButton } from "./submit-button";
import { useFetcher, useSearchParams } from "@remix-run/node";

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null;
  customer: HttpTypes.StoreCustomer | null;
}) => {
  const fetcher = useFetcher();
  const [searchParams, setSearchParams] = useSearchParams();

  const isOpen = searchParams.get("step") === "address";

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true,
  );

  const handleEdit = () => {
    setSearchParams({ step: "address" });
  };

  return (
    <div className="bg-white">
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading level="h2" className="flex flex-row text-3xl-regular gap-x-2 items-baseline">
          Shipping Address
          {!isOpen && <CheckCircleSolid />}
        </Heading>
        {!isOpen && cart?.shipping_address && (
          <Text>
            <button
              onClick={handleEdit}
              className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover"
              data-testid="edit-address-button"
            >
              Edit
            </button>
          </Text>
        )}
      </div>
      {isOpen ? (
        <fetcher.Form action="/account/addresses/set" method="post">
          <div className="pb-8">
            <ShippingAddress customer={customer} checked={sameAsBilling} onChange={toggleSameAsBilling} cart={cart} />

            {!sameAsBilling && (
              <div>
                <Heading level="h2" className="text-3xl-regular gap-x-4 pb-6 pt-8">
                  Billing address
                </Heading>

                <BillingAddress cart={cart} />
              </div>
            )}
            <SubmitButton className="mt-6" data-testid="submit-address-button">
              Continue to delivery
            </SubmitButton>
            {fetcher.data?.success === false && (
              <ErrorMessage error={fetcher.data?.error} data-testid="address-error-message" />
            )}
          </div>
        </fetcher.Form>
      ) : (
        <div>
          <div className="text-small-regular">
            {cart?.shipping_address ? (
              <div className="flex items-start gap-x-8">
                <div className="flex items-start gap-x-1 w-full">
                  <div className="flex flex-col w-1/3" data-testid="shipping-address-summary">
                    <Text className="txt-medium-plus text-ui-fg-base mb-1">Shipping Address</Text>
                    <Text className="txt-medium text-ui-fg-subtle">
                      {cart.shipping_address.first_name} {cart.shipping_address.last_name}
                    </Text>
                    <Text className="txt-medium text-ui-fg-subtle">
                      {cart.shipping_address.address_1} {cart.shipping_address.address_2}
                    </Text>
                    <Text className="txt-medium text-ui-fg-subtle">
                      {cart.shipping_address.postal_code}, {cart.shipping_address.city}
                    </Text>
                    <Text className="txt-medium text-ui-fg-subtle">
                      {cart.shipping_address.country_code?.toUpperCase()}
                    </Text>
                  </div>

                  <div className="flex flex-col w-1/3 " data-testid="shipping-contact-summary">
                    <Text className="txt-medium-plus text-ui-fg-base mb-1">Contact</Text>
                    <Text className="txt-medium text-ui-fg-subtle">{cart.shipping_address.phone}</Text>
                    <Text className="txt-medium text-ui-fg-subtle">{cart.email}</Text>
                  </div>

                  <div className="flex flex-col w-1/3" data-testid="billing-address-summary">
                    <Text className="txt-medium-plus text-ui-fg-base mb-1">Billing Address</Text>

                    {sameAsBilling ? (
                      <Text className="txt-medium text-ui-fg-subtle">Billing- and delivery address are the same.</Text>
                    ) : (
                      <>
                        <Text className="txt-medium text-ui-fg-subtle">
                          {cart.billing_address?.first_name} {cart.billing_address?.last_name}
                        </Text>
                        <Text className="txt-medium text-ui-fg-subtle">
                          {cart.billing_address?.address_1} {cart.billing_address?.address_2}
                        </Text>
                        <Text className="txt-medium text-ui-fg-subtle">
                          {cart.billing_address?.postal_code}, {cart.billing_address?.city}
                        </Text>
                        <Text className="txt-medium text-ui-fg-subtle">
                          {cart.billing_address?.country_code?.toUpperCase()}
                        </Text>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <Spinner />
              </div>
            )}
          </div>
        </div>
      )}
      <Divider className="mt-8" />
    </div>
  );
};

export default Addresses;
