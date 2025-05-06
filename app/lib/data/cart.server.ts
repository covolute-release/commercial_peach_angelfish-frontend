import { sdk } from "@/lib/config";
import medusaError from "@/lib/util/medusa-error";
import type { HttpTypes } from "@medusajs/types";
import { getAuthHeaders, getCartId, removeCartId, setCartId } from "./cookies.server";
import { getRegion } from "./regions.server";
import { redirect } from "@remix-run/node";

/**
 * Retrieves a cart by its ID. If no ID is provided, it will use the cart ID from the cookies.
 * @param cartId - optional - The ID of the cart to retrieve.
 * @returns The cart object if found, or null if not found.
 */
export async function retrieveCart(request: Request, cartId?: string) {
  const id = cartId || (await getCartId(request));

  if (!id) {
    return null;
  }

  const headers = {
    ...(await getAuthHeaders(request)),
  };

  return await sdk.client
    .fetch<HttpTypes.StoreCartResponse>(`/store/carts/${id}`, {
      method: "GET",
      query: {
        fields:
          "*items, *region, *items.product, *items.variant, *items.thumbnail, *items.metadata, +items.total, *promotions, +shipping_methods.name",
      },
      headers,
      cache: "force-cache",
    })
    .then(({ cart }) => cart)
    .catch(() => null);
}

export async function getOrSetCart(request: Request, responseHeaders: Headers, countryCode: string) {
  const region = await getRegion(countryCode);

  if (!region) {
    throw new Error(`Region not found for country code: ${countryCode}`);
  }

  let cart = await retrieveCart(request);

  const headers = {
    ...(await getAuthHeaders(request)),
  };

  if (!cart) {
    const cartResp = await sdk.store.cart.create({ region_id: region.id }, {}, headers);
    cart = cartResp.cart;

    await setCartId(responseHeaders, cart.id);
  }

  if (cart && cart?.region_id !== region.id) {
    await sdk.store.cart.update(cart.id, { region_id: region.id }, {}, headers);
  }

  return cart;
}

export async function updateCart(request: Request, data: HttpTypes.StoreUpdateCart) {
  const cartId = await getCartId(request);

  if (!cartId) {
    throw new Error("No existing cart found, please create one before updating");
  }

  const headers = {
    ...(await getAuthHeaders(request)),
  };

  return sdk.store.cart
    .update(cartId, data, {}, headers)
    .then(async ({ cart }) => {
      return cart;
    })
    .catch(medusaError);
}

export async function addToCart({
  request,
  responseHeaders,
  variantId,
  quantity,
  countryCode,
}: {
  request: Request;
  responseHeaders: Headers;
  variantId: string;
  quantity: number;
  countryCode: string;
}) {
  if (!variantId) {
    throw new Error("Missing variant ID when adding to cart");
  }

  const cart = await getOrSetCart(request, responseHeaders, countryCode);

  if (!cart) {
    throw new Error("Error retrieving or creating cart");
  }

  const headers = {
    ...(await getAuthHeaders(request)),
  };

  await sdk.store.cart
    .createLineItem(
      cart.id,
      {
        variant_id: variantId,
        quantity,
      },
      {},
      headers,
    )
    .catch(medusaError);
}

export async function updateLineItem({
  request,
  lineId,
  quantity,
}: {
  request: Request;
  lineId: string;
  quantity: number;
}) {
  if (!lineId) {
    throw new Error("Missing lineItem ID when updating line item");
  }

  const cartId = await getCartId(request);

  if (!cartId) {
    throw new Error("Missing cart ID when updating line item");
  }

  const headers = {
    ...(await getAuthHeaders(request)),
  };

  await sdk.store.cart.updateLineItem(cartId, lineId, { quantity }, {}, headers).catch(medusaError);
}

export async function deleteLineItem(request: Request, lineId: string) {
  if (!lineId) {
    throw new Error("Missing lineItem ID when deleting line item");
  }

  const cartId = await getCartId(request);

  if (!cartId) {
    throw new Error("Missing cart ID when deleting line item");
  }

  const headers = {
    ...(await getAuthHeaders(request)),
  };

  await sdk.store.cart.deleteLineItem(cartId, lineId, headers).catch(medusaError);
}

export async function setShippingMethod({
  request,
  cartId,
  shippingMethodId,
}: {
  request: Request;
  cartId: string;
  shippingMethodId: string;
}) {
  const headers = {
    ...(await getAuthHeaders(request)),
  };

  return sdk.store.cart.addShippingMethod(cartId, { option_id: shippingMethodId }, {}, headers).catch(medusaError);
}

export async function initiatePaymentSession(
  request: Request,
  cart: HttpTypes.StoreCart,
  data: HttpTypes.StoreInitializePaymentSession,
) {
  const headers = {
    ...(await getAuthHeaders(request)),
  };

  return sdk.store.payment
    .initiatePaymentSession(cart, data, {}, headers)
    .then(async (resp) => {
      return resp;
    })
    .catch(medusaError);
}

export async function applyPromotions(request: Request, codes: string[]) {
  const cartId = await getCartId(request);

  if (!cartId) {
    throw new Error("No existing cart found");
  }

  const headers = {
    ...(await getAuthHeaders(request)),
  };

  return sdk.store.cart.update(cartId, { promo_codes: codes }, {}, headers).catch(medusaError);
}

export async function applyGiftCard(_code: string) {
  //   const cartId = getCartId()
  //   if (!cartId) return "No cartId cookie found"
  //   try {
  //     await updateCart(cartId, { gift_cards: [{ code }] }).then(() => {
  //       revalidateTag("cart")
  //     })
  //   } catch (error: any) {
  //     throw error
  //   }
}

export async function removeDiscount(_code: string) {
  // const cartId = getCartId()
  // if (!cartId) return "No cartId cookie found"
  // try {
  //   await deleteDiscount(cartId, code)
  //   revalidateTag("cart")
  // } catch (error: any) {
  //   throw error
  // }
}

export async function removeGiftCard(
  _codeToRemove: string,
  _giftCards: any[],
  // giftCards: GiftCard[]
) {
  //   const cartId = getCartId()
  //   if (!cartId) return "No cartId cookie found"
  //   try {
  //     await updateCart(cartId, {
  //       gift_cards: [...giftCards]
  //         .filter((gc) => gc.code !== codeToRemove)
  //         .map((gc) => ({ code: gc.code })),
  //     }).then(() => {
  //       revalidateTag("cart")
  //     })
  //   } catch (error: any) {
  //     throw error
  //   }
}

export async function submitPromotionForm(request: Request, formData: FormData) {
  const code = formData.get("code") as string;
  try {
    await applyPromotions(request, [code]);
  } catch (e: any) {
    return e.message;
  }
}

// TODO: Pass a POJO instead of a form entity here
export async function setAddresses(request: Request, formData: FormData): Promise<string | Response> {
  try {
    if (!formData) {
      throw new Error("No form data found when setting addresses");
    }
    const cartId = getCartId(request);
    if (!cartId) {
      throw new Error("No existing cart found when setting addresses");
    }

    const data = {
      shipping_address: {
        first_name: formData.get("shipping_address.first_name"),
        last_name: formData.get("shipping_address.last_name"),
        address_1: formData.get("shipping_address.address_1"),
        address_2: "",
        company: formData.get("shipping_address.company"),
        postal_code: formData.get("shipping_address.postal_code"),
        city: formData.get("shipping_address.city"),
        country_code: formData.get("shipping_address.country_code"),
        province: formData.get("shipping_address.province"),
        phone: formData.get("shipping_address.phone"),
      },
      email: formData.get("email"),
    } as any;

    const sameAsBilling = formData.get("same_as_billing");
    if (sameAsBilling === "on") data.billing_address = data.shipping_address;

    if (sameAsBilling !== "on")
      data.billing_address = {
        first_name: formData.get("billing_address.first_name"),
        last_name: formData.get("billing_address.last_name"),
        address_1: formData.get("billing_address.address_1"),
        address_2: "",
        company: formData.get("billing_address.company"),
        postal_code: formData.get("billing_address.postal_code"),
        city: formData.get("billing_address.city"),
        country_code: formData.get("billing_address.country_code"),
        province: formData.get("billing_address.province"),
        phone: formData.get("billing_address.phone"),
      };
    await updateCart(request, data);
  } catch (e: any) {
    return e.message;
  }

  return redirect(`/${formData.get("shipping_address.country_code")}/checkout?step=delivery`);
}

/**
 * Places an order for a cart. If no cart ID is provided, it will use the cart ID from the cookies.
 * @param cartId - optional - The ID of the cart to place an order for.
 * @returns The cart object if the order was successful, or null if not.
 */
export async function placeOrder(request: Request, responseHeaders: Headers, cartId?: string) {
  const id = cartId || (await getCartId(request));

  if (!id) {
    throw new Error("No existing cart found when placing an order");
  }

  const headers = {
    ...(await getAuthHeaders(request)),
  };

  const cartRes = await sdk.store.cart
    .complete(id, {}, headers)
    .then(async (cartRes) => {
      return cartRes;
    })
    .catch(medusaError);

  if (cartRes?.type === "order") {
    const countryCode = cartRes.order.shipping_address?.country_code?.toLowerCase();

    await removeCartId(responseHeaders);
    return redirect(`/${countryCode}/order/${cartRes?.order.id}/confirmed`, {
      headers: responseHeaders,
    });
  }

  return cartRes.cart;
}

/**
 * Updates the countrycode param and revalidates the regions cache
 * @param regionId
 * @param countryCode
 */
export async function updateRegion(request: Request, countryCode: string, currentPath: string) {
  const cartId = await getCartId(request);
  const region = await getRegion(countryCode);

  if (!region) {
    throw new Error(`Region not found for country code: ${countryCode}`);
  }

  if (cartId) {
    await updateCart(request, { region_id: region.id });
  }

  return redirect(`/${countryCode}${currentPath}`);
}

export async function listCartOptions(request: Request) {
  const cartId = await getCartId(request);
  const headers = {
    ...(await getAuthHeaders(request)),
  };

  return await sdk.client.fetch<{
    shipping_options: HttpTypes.StoreCartShippingOption[];
  }>("/store/shipping-options", {
    query: { cart_id: cartId },
    headers,
    cache: "force-cache",
  });
}
