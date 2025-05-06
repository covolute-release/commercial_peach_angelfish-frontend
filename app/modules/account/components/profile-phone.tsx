import type { FC } from "react";
import { useState, useEffect } from "react";

import Input from "@/modules/common/components/input";

import AccountInfo from "./account-info";
import type { HttpTypes } from "@medusajs/types";
import { useFetcher } from "@remix-run/node";

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer;
};

const ProfileEmail: FC<MyInformationProps> = ({ customer }) => {
  const fetcher = useFetcher();
  const [successState, setSuccessState] = useState(false);

  const clearState = () => {
    setSuccessState(false);
  };

  useEffect(() => {
    setSuccessState(fetcher.state === "idle");
  }, [fetcher.state]);

  return (
    <fetcher.Form method="patch" className="w-full">
      <AccountInfo
        label="Phone"
        currentInfo={`${customer.phone}`}
        isSuccess={fetcher.data?.success === true && successState}
        isError={fetcher.data?.success === false}
        errorMessage={fetcher.data?.message}
        clearState={clearState}
        data-testid="account-phone-editor"
      >
        <div className="grid grid-cols-1 gap-y-2">
          <Input
            label="Phone"
            name="phone"
            type="phone"
            autoComplete="phone"
            required
            defaultValue={customer.phone ?? ""}
            data-testid="phone-input"
          />
        </div>
      </AccountInfo>
    </fetcher.Form>
  );
};

export default ProfileEmail;
