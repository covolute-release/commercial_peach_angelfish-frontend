import type { FC } from "react";
import { useState, useEffect, useMemo } from "react";

import Input from "@/modules/common/components/input";
import CountrySelect from "@/modules/checkout/components/country-select";

import AccountInfo from "./account-info";
import type { HttpTypes } from "@medusajs/types";
import { useFetcher } from "@remix-run/node";

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer;
  regions: HttpTypes.StoreRegion[];
};

const ProfileBillingAddress: FC<MyInformationProps> = ({ customer, regions }) => {
  const fetcher = useFetcher();
  const regionOptions = useMemo(() => {
    return (
      regions?.flatMap((region) => {
        return region.countries?.map((country) => ({
          value: country.iso_2,
          label: country.display_name,
        }));
      }) || []
    );
  }, [regions]);

  const [successState, setSuccessState] = useState(false);

  const billingAddress = customer.addresses?.find((addr) => addr.is_default_billing);

  const initialState: Record<string, any> = {
    isDefaultBilling: true,
    isDefaultShipping: false,
    error: false,
    success: false,
  };

  if (billingAddress) {
    initialState.addressId = billingAddress.id;
  }

  const clearState = () => {
    setSuccessState(false);
  };

  useEffect(() => {
    if (fetcher.state === "idle") {
      setSuccessState(true);
    }
  }, [fetcher.state]);

  const currentInfo = useMemo(() => {
    if (!billingAddress) {
      return "No billing address";
    }

    const country =
      regionOptions?.find((country) => country?.value === billingAddress.country_code)?.label ||
      billingAddress.country_code?.toUpperCase();

    return (
      <div className="flex flex-col font-semibold" data-testid="current-info">
        <span>
          {billingAddress.first_name} {billingAddress.last_name}
        </span>
        <span>{billingAddress.company}</span>
        <span>
          {billingAddress.address_1}
          {billingAddress.address_2 ? `, ${billingAddress.address_2}` : ""}
        </span>
        <span>
          {billingAddress.postal_code}, {billingAddress.city}
        </span>
        <span>{country}</span>
      </div>
    );
  }, [billingAddress, regionOptions]);

  return (
    <fetcher.Form
      method={billingAddress ? "put" : "POST"}
      action={billingAddress ? `/account/address/${billingAddress.id}` : "/account/address"}
      onReset={() => clearState()}
      className="w-full"
    >
      <input type="hidden" name="addressId" value={billingAddress?.id} />
      <input type="hidden" name="is_default_billing" value={initialState.isDefaultBilling ? "true" : "false"} />
      <input type="hidden" name="is_default_shipping" value={initialState.isDefaultShipping ? "true" : "false"} />
      <AccountInfo
        label="Billing address"
        currentInfo={currentInfo}
        isSuccess={fetcher.data?.success === true && successState}
        isError={fetcher.data?.success === false}
        errorMessage={fetcher.data?.message}
        clearState={clearState}
        data-testid="account-billing-address-editor"
      >
        <div className="grid grid-cols-1 gap-y-2">
          <div className="grid grid-cols-2 gap-x-2">
            <Input
              label="First name"
              name="first_name"
              required
              autoComplete="given-name"
              defaultValue={billingAddress?.first_name || undefined}
              data-testid="first-name-input"
            />
            <Input
              label="Last name"
              name="last_name"
              required
              autoComplete="family-name"
              defaultValue={billingAddress?.last_name || undefined}
              data-testid="last-name-input"
            />
          </div>
          <Input
            label="Company"
            name="company"
            autoComplete="organization"
            defaultValue={billingAddress?.company || undefined}
            data-testid="company-input"
          />
          <Input
            label="Address"
            name="address_1"
            required
            autoComplete="address-line1"
            defaultValue={billingAddress?.address_1 || undefined}
            data-testid="address-1-input"
          />
          <Input
            label="Apartment, suite, etc."
            name="address_2"
            autoComplete="address-line2"
            defaultValue={billingAddress?.address_2 || undefined}
            data-testid="address-2-input"
          />
          <div className="grid grid-cols-[144px_1fr] gap-x-2">
            <Input
              label="Postal code"
              name="postal_code"
              required
              autoComplete="postal-code"
              defaultValue={billingAddress?.postal_code || undefined}
              data-testid="postal-code-input"
            />
            <Input
              label="City"
              name="city"
              required
              autoComplete="locality"
              defaultValue={billingAddress?.city || undefined}
              data-testid="city-input"
            />
          </div>
          <Input
            label="Province / State"
            name="province"
            autoComplete="address-level1"
            defaultValue={billingAddress?.province || undefined}
            data-testid="state-input"
          />
          <CountrySelect
            name="country_code"
            region={regions[0]}
            required
            autoComplete="country"
            defaultValue={billingAddress?.country_code || undefined}
            data-testid="country-select"
          />
          <Input
            label="Phone"
            name="phone"
            autoComplete="phone"
            defaultValue={billingAddress?.phone || undefined}
            data-testid="phone-input"
          />
        </div>
      </AccountInfo>
    </fetcher.Form>
  );
};

export default ProfileBillingAddress;
