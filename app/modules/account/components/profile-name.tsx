import type { FC } from "react";
import { useState, useEffect } from "react";

import Input from "@/modules/common/components/input";

import AccountInfo from "./account-info";
import type { HttpTypes } from "@medusajs/types";
import { useFetcher } from "@remix-run/node";

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer;
};

const ProfileName: FC<MyInformationProps> = ({ customer }) => {
  const fetcher = useFetcher();
  const [successState, setSuccessState] = useState(false);

  const clearState = () => {
    setSuccessState(false);
  };

  useEffect(() => {
    setSuccessState(fetcher.state === "idle");
  }, [fetcher.state]);

  return (
    <fetcher.Form className="w-full overflow-visible" method="patch">
      <AccountInfo
        label="Name"
        currentInfo={`${customer.first_name} ${customer.last_name}`}
        isSuccess={fetcher.data?.success === true && successState}
        isError={fetcher.data?.success === false}
        clearState={clearState}
        data-testid="account-name-editor"
      >
        <div className="grid grid-cols-2 gap-x-4">
          <Input
            label="First name"
            name="first_name"
            required
            defaultValue={customer.first_name ?? ""}
            data-testid="first-name-input"
          />
          <Input
            label="Last name"
            name="last_name"
            required
            defaultValue={customer.last_name ?? ""}
            data-testid="last-name-input"
          />
        </div>
      </AccountInfo>
    </fetcher.Form>
  );
};

export default ProfileName;
