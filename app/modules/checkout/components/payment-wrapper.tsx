import { loadStripe } from "@stripe/stripe-js";
import type React from "react";
import { useMemo } from "react";
import StripeWrapper from "./stripe-wrapper";
import type { HttpTypes } from "@medusajs/types";
import { isStripe } from "@/lib/constants";

type PaymentWrapperProps = {
  cart: HttpTypes.StoreCart;
  children: React.ReactNode;
  stripeKey?: string;
};

const PaymentWrapper: React.FC<PaymentWrapperProps> = ({ cart, children, stripeKey }) => {
  const paymentSession = cart.payment_collection?.payment_sessions?.find((s) => s.status === "pending");

  const stripePromise = useMemo(() => (stripeKey ? loadStripe(stripeKey) : null), [stripeKey]);

  if (isStripe(paymentSession?.provider_id) && paymentSession && stripePromise) {
    return (
      <StripeWrapper paymentSession={paymentSession} stripeKey={stripeKey} stripePromise={stripePromise}>
        {children}
      </StripeWrapper>
    );
  }

  return <div>{children}</div>;
};

export default PaymentWrapper;
