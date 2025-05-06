import Register from "@/modules/account/components/register";
import type { Route } from "./+types/_main.$countryCode.auth.signin";
import { signup } from "@/lib/data/customer.server";

export const meta: Route.MetaDescriptors = [
  {
    title: "Sign up",
    description: "Sign up to your Medusa Store account.",
  },
];

export const action = async ({ request, params }: Route.ActionArgs) => {
  const responseHeaders = new Headers();
  responseHeaders.append("Location", `/${params.countryCode}/account`);
  try {
    const message = await signup(request, responseHeaders, undefined, await request.formData());
    if (typeof message === "string") {
      return new Response(message, { status: 500 });
    }
  } catch (error: any) {
    return new Response(error.toString(), { status: 500 });
  }
  return new Response(null, { status: 200, headers: responseHeaders });
};

export default function Signup() {
  return (
    <div className="w-full flex justify-start px-8 py-8">
      <Register />
    </div>
  );
}
