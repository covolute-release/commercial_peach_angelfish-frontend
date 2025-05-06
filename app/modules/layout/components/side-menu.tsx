import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react";
import { ArrowRightMini, XMark } from "@medusajs/icons";
import { Text } from "@/components/text";
import { useToggleState } from "@/hooks/use-toggle-state";
import { cn } from "@/lib/utils";
import { Fragment, useEffect, useRef } from "react";

import LocalizedClientLink from "@/modules/common/components/localized-client-link";
import CountrySelect from "./country-select";
import type { HttpTypes } from "@medusajs/types";

const SideMenuItems = {
  Home: "/",
  Store: "/store",
  Account: "/account",
  Cart: "/cart",
};

const SideMenu = ({ regions }: { regions: HttpTypes.StoreRegion[] | null }) => {
  const toggleState = useToggleState();
  const popoverRef = useRef<HTMLDivElement>(null);

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => {
            useEffect(() => {
              if (open) {
                const clickOutsideHandler = (event: MouseEvent) => {
                  if (popoverRef.current?.contains(event.target as Node)) return;
                  close();
                };
                document.body.addEventListener("pointerdown", clickOutsideHandler, {
                  passive: true,
                });
                return () => {
                  document.body.removeEventListener("pointerdown", clickOutsideHandler);
                };
              }
            }, [open]);
            return (
              <>
                <div className="relative flex h-full">
                  <PopoverButton
                    data-testid="nav-menu-button"
                    className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base"
                  >
                    Menu
                  </PopoverButton>
                </div>

                <Transition
                  show={open}
                  as={Fragment}
                  enter="transition ease-out duration-150"
                  enterFrom="opacity-0"
                  enterTo="opacity-100 backdrop-blur-2xl"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 backdrop-blur-2xl"
                  leaveTo="opacity-0"
                >
                  <PopoverPanel
                    ref={popoverRef}
                    className="flex flex-col absolute w-full pr-4 sm:pr-0 sm:w-1/3 2xl:w-1/4 sm:min-w-min h-[calc(100vh-1rem)] z-30 inset-x-0 text-sm text-ui-fg-on-color m-2 backdrop-blur-2xl"
                  >
                    <div
                      data-testid="nav-menu-popup"
                      className="flex flex-col h-full bg-[rgba(3,7,18,0.5)] rounded-rounded justify-between p-6"
                    >
                      <div className="flex justify-end" id="xmark">
                        <button data-testid="close-menu-button" onClick={close} type="button">
                          <XMark />
                        </button>
                      </div>
                      <ul className="flex flex-col gap-6 items-start justify-start">
                        {Object.entries(SideMenuItems).map(([name, href]) => {
                          return (
                            <li key={name}>
                              <LocalizedClientLink
                                href={href}
                                className="text-3xl leading-10 hover:text-ui-fg-disabled"
                                onClick={close}
                                data-testid={`${name.toLowerCase()}-link`}
                              >
                                {name}
                              </LocalizedClientLink>
                            </li>
                          );
                        })}
                      </ul>
                      <div className="flex flex-col gap-y-6">
                        <div
                          className="flex justify-between"
                          onMouseEnter={toggleState.open}
                          onMouseLeave={toggleState.close}
                        >
                          {regions && (
                            <CountrySelect
                              toggleState={{
                                ...toggleState,
                                close: () => {
                                  toggleState.close();
                                  close();
                                },
                              }}
                              regions={regions}
                            />
                          )}
                          <ArrowRightMini
                            className={cn("transition-transform duration-150", toggleState.state ? "-rotate-90" : "")}
                          />
                        </div>
                        <Text className="flex justify-between txt-compact-small text-ui-fg-muted">
                          © {new Date().getFullYear()} Petopia. All rights reserved.
                        </Text>
                      </div>
                    </div>
                  </PopoverPanel>
                </Transition>
              </>
            );
          }}
        </Popover>
      </div>
    </div>
  );
};

export default SideMenu;