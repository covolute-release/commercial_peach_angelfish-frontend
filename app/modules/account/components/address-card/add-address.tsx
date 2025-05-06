import { Plus } from "@medusajs/icons";
import { Heading } from "@/components/heading";
import { Button } from "@/components/button";
import { useEffect } from "react";

import useToggleState from "@/lib/hooks/use-toggle-state";
import CountrySelect from "@/modules/checkout/components/country-select";
import Input from "@/modules/common/components/input";
import Modal from "@/modules/common/components/modal";
import { SubmitButton } from "@/modules/checkout/components/submit-button";
import type { HttpTypes } from "@medusajs/types";
import { useFetcher } from "@remix-run/node";

const AddAddress = ({
  region,
  addresses,
}: {
  region: HttpTypes.StoreRegion;
  addresses: HttpTypes.StoreCustomerAddress[];
}) => {
  const fetcher = useFetcher();
  const { state, open, close } = useToggleState(false);

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.success === true) {
      close();
    }
  }, [fetcher.state]);

  return (
    <>
      <button
        className="border border-ui-border-base rounded-rounded p-5 min-h-[220px] h-full w-full flex flex-col justify-between"
        onClick={open}
        data-testid="add-address-button"
        type="button"
      >
        <span className="text-base-semi">New address</span>
        <Plus />
      </button>

      <Modal isOpen={state} close={close} data-testid="add-address-modal">
        <Modal.Title>
          <Heading className="mb-2">Add address</Heading>
        </Modal.Title>
        <fetcher.Form method="post" action="/account/address">
          <input type="hidden" name="is_default_shipping" value={addresses.length === 0 ? "true" : "false"} />
          <Modal.Body className="flex-col">
            <div className="flex flex-col gap-y-2">
              <div className="grid grid-cols-2 gap-x-2">
                <Input
                  label="First name"
                  name="first_name"
                  required
                  autoComplete="given-name"
                  data-testid="first-name-input"
                  autoFocus
                />
                <Input
                  label="Last name"
                  name="last_name"
                  required
                  autoComplete="family-name"
                  data-testid="last-name-input"
                />
              </div>
              <Input label="Company" name="company" autoComplete="organization" data-testid="company-input" />
              <Input
                label="Address"
                name="address_1"
                required
                autoComplete="address-line1"
                data-testid="address-1-input"
              />
              <Input
                label="Apartment, suite, etc."
                name="address_2"
                autoComplete="address-line2"
                data-testid="address-2-input"
              />
              <div className="grid grid-cols-[144px_1fr] gap-x-2">
                <Input
                  label="Postal code"
                  name="postal_code"
                  required
                  autoComplete="postal-code"
                  data-testid="postal-code-input"
                />
                <Input label="City" name="city" required autoComplete="locality" data-testid="city-input" />
              </div>
              <Input label="Province / State" name="province" autoComplete="address-level1" data-testid="state-input" />
              <CountrySelect
                region={region}
                name="country_code"
                required
                autoComplete="country"
                data-testid="country-select"
              />
              <Input label="Phone" name="phone" autoComplete="phone" data-testid="phone-input" />
            </div>
            {fetcher.data?.success === false && (
              <div className="text-rose-500 text-small-regular py-2" data-testid="address-error">
                {fetcher.data?.error}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <div className="flex gap-3 mt-6">
              <Button
                type="reset"
                variant="secondary"
                onClick={close}
                className="h-10"
                data-testid="cancel-button"
                disabled={fetcher.state === "submitting"}
              >
                Cancel
              </Button>
              <SubmitButton data-testid="save-button">Save</SubmitButton>
            </div>
          </Modal.Footer>
        </fetcher.Form>
      </Modal>
    </>
  );
};

export default AddAddress;
