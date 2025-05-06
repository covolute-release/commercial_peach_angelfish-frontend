import { retrieveCart } from "@/lib/data/cart.server";
import type { Route } from "./+types/_checkout.$countryCode.checkout";
import { retrieveCustomer } from "@/lib/data/customer.server";
import { redirect, useLoaderData } from "@remix-run/node";
import PaymentWrapper from "@/modules/checkout/components/payment-wrapper";
import CheckoutForm from "@/modules/checkout/templates/checkout-form";
import CheckoutSummary from "@/modules/checkout/templates/checkout-summary";
import { listCartShippingMethods } from "@/lib/data/fulfillment.server";
import { listCartPaymentMethods } from "@/lib/data/payment.server";

export const meta: Route.MetaDescriptors = [
  {
    title: "Checkout",
  },
];

export const loader = async ({ request }: Route.LoaderArgs) => {
  const cart = await retrieveCart(request);
  if (!cart) {
    return redirect("/");
  }

  const shippingMethods = await listCartShippingMethods(request, cart.id);
  const paymentMethods = await listCartPaymentMethods(request, cart.region?.id ?? "");

  const customer = await retrieveCustomer(request);

  return {
    cart,
    customer,
    shippingMethods,
    paymentMethods,
    stripeKey: process.env.NEXT_PUBLIC_STRIPE_KEY,
  };
};

export default function Checkout() {
  const { cart, customer, shippingMethods, paymentMethods, stripeKey } = useLoaderData<typeof loader>();

  return (
    <div className="grid grid-cols-1 small:grid-cols-[1fr_416px] content-container gap-x-40 py-12">
      <PaymentWrapper cart={cart} stripeKey={stripeKey}>
        <CheckoutForm
          cart={cart}
          customer={customer}
          shippingMethods={shippingMethods}
          paymentMethods={paymentMethods}
        />
      </PaymentWrapper>
      <CheckoutSummary cart={cart} />
    </div>
  );
}
