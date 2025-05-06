import { login } from "@/lib/data/customer.server";
import type { Route } from "./+types/_main.$countryCode.auth.signin";
import Login from "@/modules/account/components/login";

export const meta: Route.MetaDescriptors = [
  {
    title: "Sign in",
    description: "Sign in to your Medusa Store account.",
  },
];

export const action = async ({ request, params }: Route.ActionArgs) => {
  const responseHeaders = new Headers();
  responseHeaders.append("Location", `/${params.countryCode}/account`);
  try {
    const message = await login(request, responseHeaders, undefined, await request.formData());
    if (message) {
      return new Response(message, { status: 500, headers: responseHeaders });
    }
  } catch (error: any) {
    return new Response(error.toString(), {
      status: 500,
      headers: responseHeaders,
    });
  }
  return new Response(null, { status: 200, headers: responseHeaders });
};

export default function Signin() {
  return (
    <div className="w-full flex justify-start px-8 py-8">
      <Login />
    </div>
  );
}
