import { cn } from "@/lib/utils";
import { ArrowRightOnRectangle } from "@medusajs/icons";

import ChevronDown from "@/modules/common/icons/chevron-down";
import User from "@/modules/common/icons/user";
import MapPin from "@/modules/common/icons/map-pin";
import Package from "@/modules/common/icons/package";
import LocalizedClientLink from "@/modules/common/components/localized-client-link";
import type { HttpTypes } from "@medusajs/types";
import { useLocation, useNavigate, useParams } from "@remix-run/node";

const AccountNav = ({
  customer,
}: {
  customer: HttpTypes.StoreCustomer | null;
}) => {
  const navigate = useNavigate();
  const route = useLocation().pathname;
  const { countryCode } = useParams() as { countryCode: string };

  const handleLogout = async () => {
    navigate(`/${countryCode}/auth/signout`);
  };

  return (
    <div>
      <div className="small:hidden" data-testid="mobile-account-nav">
        {route !== `/${countryCode}/account/overview` ? (
          <LocalizedClientLink
            href="/account"
            className="flex items-center gap-x-2 text-small-regular py-2"
            data-testid="account-main-link"
          >
            <>
              <ChevronDown className="transform rotate-90" />
              <span>Account</span>
            </>
          </LocalizedClientLink>
        ) : (
          <>
            <div className="text-xl-semi mb-4 px-8">Hello {customer?.first_name}</div>
            <div className="text-base-regular">
              <ul>
                <li>
                  <LocalizedClientLink
                    href="/account/profile"
                    className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
                    data-testid="profile-link"
                  >
                    <>
                      <div className="flex items-center gap-x-2">
                        <User size={20} />
                        <span>Profile</span>
                      </div>
                      <ChevronDown className="transform -rotate-90" />
                    </>
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account/addresses"
                    className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
                    data-testid="addresses-link"
                  >
                    <>
                      <div className="flex items-center gap-x-2">
                        <MapPin size={20} />
                        <span>Addresses</span>
                      </div>
                      <ChevronDown className="transform -rotate-90" />
                    </>
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account/orders"
                    className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
                    data-testid="orders-link"
                  >
                    <div className="flex items-center gap-x-2">
                      <Package size={20} />
                      <span>Orders</span>
                    </div>
                    <ChevronDown className="transform -rotate-90" />
                  </LocalizedClientLink>
                </li>
                <li>
                  <button
                    type="button"
                    className="flex items-center justify-between py-4 border-b border-gray-200 px-8 w-full"
                    onClick={handleLogout}
                    data-testid="logout-button"
                  >
                    <div className="flex items-center gap-x-2">
                      <ArrowRightOnRectangle />
                      <span>Log out</span>
                    </div>
                    <ChevronDown className="transform -rotate-90" />
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
      <div className="hidden small:block" data-testid="account-nav">
        <div>
          <div className="pb-4">
            <h3 className="text-base-semi">Account</h3>
          </div>
          <div className="text-base-regular">
            <ul className="flex mb-0 justify-start items-start flex-col gap-y-4">
              <li>
                <AccountNavLink href="/account/overview" route={route!} data-testid="overview-link">
                  Overview
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink href="/account/profile" route={route!} data-testid="profile-link">
                  Profile
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink href="/account/addresses" route={route!} data-testid="addresses-link">
                  Addresses
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink href="/account/orders" route={route!} data-testid="orders-link">
                  Orders
                </AccountNavLink>
              </li>
              <li className="text-grey-700">
                <button type="button" onClick={handleLogout} data-testid="logout-button">
                  Log out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

type AccountNavLinkProps = {
  href: string;
  route: string;
  children: React.ReactNode;
  "data-testid"?: string;
};

const AccountNavLink = ({ href, route, children, "data-testid": dataTestId }: AccountNavLinkProps) => {
  const { countryCode }: { countryCode: string } = useParams();

  const active = route.split(countryCode)[1] === href;
  return (
    <LocalizedClientLink
      href={href}
      className={cn("text-ui-fg-subtle hover:text-ui-fg-base", {
        "text-ui-fg-base font-semibold": active,
      })}
      data-testid={dataTestId}
    >
      {children}
    </LocalizedClientLink>
  );
};

export default AccountNav;
