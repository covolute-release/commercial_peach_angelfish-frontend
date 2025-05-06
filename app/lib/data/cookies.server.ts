import { medusaCartId, medusaJWT } from "@/cookies.server";

export const getAuthHeaders = async (request: Request): Promise<{ authorization: string } | {}> => {
  const token = await medusaJWT.parse(request.headers.get("Cookie"));

  if (!token) {
    return {};
  }

  return { authorization: `Bearer ${token}` };
};

export const setAuthToken = async (requestHeaders: Headers, responseHeaders: Headers, token: string) => {
  const cookie = requestHeaders.get("Cookie") ?? "";
  requestHeaders.set(
    "Cookie",
    (await medusaJWT.serialize(token, {
      maxAge: undefined,
      path: undefined,
      httpOnly: undefined,
      sameSite: undefined,
      secure: undefined,
      expires: undefined,
      domain: undefined,
    })) +
      (cookie ? "; " : "") +
      cookie,
  );
  responseHeaders.append("Set-Cookie", await medusaJWT.serialize(token));
};

export const removeAuthToken = async (headers: Headers) => {
  headers.append(
    "Set-Cookie",
    await medusaJWT.serialize("", {
      maxAge: -1,
    }),
  );
};

export const getCartId = async (request: Request) => {
  return await medusaCartId.parse(request.headers.get("Cookie"));
};

export const setCartId = async (headers: Headers, cartId: string) => {
  headers.append("Set-Cookie", await medusaCartId.serialize(cartId));
};

export const removeCartId = async (headers: Headers) => {
  headers.append(
    "Set-Cookie",
    await medusaCartId.serialize("", {
      maxAge: -1,
    }),
  );
};
