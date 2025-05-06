import { createCookie } from "@remix-run/node";

export const medusaJWT = createCookie("_medusa_jwt", {
  maxAge: 60 * 60 * 24 * 7,
  httpOnly: true,
  sameSite: "strict",
  secure: process.env.NODE_ENV === "production",
});

export const medusaCartId = createCookie("_medusa_cart_id", {
  maxAge: 60 * 60 * 24 * 7,
  httpOnly: true,
  sameSite: "strict",
  secure: process.env.NODE_ENV === "production",
});
