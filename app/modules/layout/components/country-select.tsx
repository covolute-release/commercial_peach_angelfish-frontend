import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import ReactCountryFlag from "react-country-flag";

import type { StateType } from "@/lib/hooks/use-toggle-state";
import type { HttpTypes } from "@medusajs/types";
import { useFetcher, useLocation, useParams } from "@remix-run/node";

type CountryOption = {
  country: string;
  region: string;
  label: string;
};

type CountrySelectProps = {
  toggleState: StateType;
  regions: HttpTypes.StoreRegion[];
};

const CountrySelect = ({ toggleState, regions }: CountrySelectProps) => {
  const fetcher = useFetcher();
  const [current, setCurrent] = useState<
    { country: string | undefined; region: string; label: string | undefined } | undefined
  >(undefined);

  const { countryCode } = useParams();
  const currentPath = useLocation().pathname.split(`/${countryCode}`)[1];

  const { state, close } = toggleState;

  const options = useMemo(() => {
    return regions
      ?.flatMap((r) => {
        return r.countries?.map((c) => ({
          country: c.iso_2,
          region: r.id,
          label: c.display_name,
        }));
      })
      .sort((a, b) => (a?.label ?? "").localeCompare(b?.label ?? ""));
  }, [regions]);

  useEffect(() => {
    if (countryCode) {
      const option = options?.find((o) => o?.country === countryCode);
      setCurrent(option);
    }
  }, [options, countryCode]);

  const handleChange = (option: CountryOption) => {
    submitted.current = true;
    const formData = new FormData();
    formData.append("country", option.country);
    formData.append("currentPath", currentPath);
    fetcher.submit(formData, {
      method: "post",
      action: "/update/region",
    });
  };

  const submitted = useRef(false);
  useEffect(() => {
    if (submitted.current && fetcher.state === "idle") {
      close();
    }
  }, [fetcher.state]);

  return (
    <div>
      <Listbox
        as="span"
        onChange={handleChange}
        defaultValue={countryCode ? options?.find((o) => o?.country === countryCode) : undefined}
      >
        <ListboxButton className="py-1 w-full">
          <div className="txt-compact-small flex items-start gap-x-2">
            <span>Shipping to:</span>
            {current && (
              <span className="txt-compact-small flex items-center gap-x-2">
                {/* @ts-ignore */}
                <ReactCountryFlag
                  svg
                  style={{
                    width: "16px",
                    height: "16px",
                  }}
                  countryCode={current.country ?? ""}
                />
                {current.label}
              </span>
            )}
          </div>
        </ListboxButton>
        <div className="flex relative w-full min-w-[320px]">
          <Transition
            show={state}
            as={Fragment}
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions
              className="absolute -bottom-[calc(100%-36px)] left-0 xsmall:left-auto xsmall:right-0 max-h-[442px] overflow-y-scroll z-[900] bg-white drop-shadow-md text-small-regular uppercase text-black no-scrollbar rounded-rounded w-full"
              static
            >
              {options?.map((o, index) => {
                return (
                  <ListboxOption
                    key={index}
                    value={o}
                    className="py-2 hover:bg-gray-200 px-3 cursor-pointer flex items-center gap-x-2"
                  >
                    {/* @ts-ignore */}
                    <ReactCountryFlag
                      svg
                      style={{
                        width: "16px",
                        height: "16px",
                      }}
                      countryCode={o?.country ?? ""}
                    />{" "}
                    {o?.label}
                  </ListboxOption>
                );
              })}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default CountrySelect;
