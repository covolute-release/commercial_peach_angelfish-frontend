import { useCallback } from "react";

import SortProducts, { type SortOptions } from "./sort-products";
import { useLocation, useNavigate, useSearchParams } from "@remix-run/node";

type RefinementListProps = {
  sortBy: SortOptions;
  search?: boolean;
  "data-testid"?: string;
};

const RefinementList = ({ sortBy, "data-testid": dataTestId }: RefinementListProps) => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const [searchParams] = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value);
    navigate(`${pathname}?${query}`);
  };

  return (
    <div className="flex small:flex-col gap-12 py-4 mb-8 small:px-0 pl-6 small:min-w-[250px] small:ml-[1.675rem]">
      <SortProducts sortBy={sortBy} setQueryParams={setQueryParams} data-testid={dataTestId} />
    </div>
  );
};

export default RefinementList;
