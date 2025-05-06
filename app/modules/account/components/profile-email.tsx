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
        label="Email"
        currentInfo={`${customer.email}`}
        isSuccess={fetcher.data?.success === true && successState}
        isError={fetcher.data?.success === false}
        errorMessage={fetcher.data?.message}
        clearState={clearState}
        data-testid="account-email-editor"
      >
        <div className="grid grid-cols-1 gap-y-2">
          <Input
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={customer.email}
            data-testid="email-input"
          />
        </div>
      </AccountInfo>
    </fetcher.Form>
  );
};

export default ProfileEmail;
