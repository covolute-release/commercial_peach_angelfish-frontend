import type React from "react";
import { Link, useParams } from "@remix-run/node";

/**
 * Use this component to create a Next.js `<Link />` that persists the current country code in the url,
 * without having to explicitly pass it as a prop.
 */
const LocalizedClientLink = ({
  children,
  href,
  ...props
}: {
  children?: React.ReactNode;
  href: string;
  className?: string;
  onClick?: () => void;
  [x: string]: any;
}) => {
  const { countryCode } = useParams();

  return (
    <Link to={`/${countryCode}${href}`} {...props}>
      {children}
    </Link>
  );
};

export default LocalizedClientLink;
