import type { Route } from "./+types/_main.$countryCode.account.profile";
import { redirect, useLoaderData } from "@remix-run/node";
import ProfileName from "@/modules/account/components/profile-name";
// import ProfileEmail from '@/modules/account/components/profile-email';
import ProfilePhone from "@/modules/account/components/profile-phone";
import ProfileBillingAddress from "@/modules/account/components/profile-billing-address";
import { listRegions } from "@/lib/data/regions.server";
// import ProfilePassword from '@/modules/account/components/profile-password';
import { retrieveCustomer, updateCustomer } from "@/lib/data/customer.server";

export const meta: Route.MetaDescriptors = [
  {
    title: "Profile",
    description: "View and edit your Medusa Store profile.",
  },
];

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const [regions, customer] = await Promise.all([listRegions(), retrieveCustomer(request)]);

  if (!customer) {
    return redirect(`/${params.countryCode}/auth/signin`);
  }

  return { regions, customer };
};

export const action = async ({ request }: Route.ActionArgs) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());
    console.log({ data });
    await updateCustomer(request, data);
    return new Response(
      JSON.stringify({
        success: true,
      }),
      {
        status: 200,
        headers: new Headers({ "Content-Type": "application/json" }),
      },
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: new Headers({ "Content-Type": "application/json" }),
      },
    );
  }
};

export default function AccountProfile() {
  const { regions, customer } = useLoaderData<typeof loader>();

  return (
    <div className="w-full" data-testid="profile-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Profile</h1>
        <p className="text-base-regular">
          View and update your profile information, including your name, email, and phone number. You can also update
          your billing address, or change your password.
        </p>
      </div>
      <div className="flex flex-col gap-y-8 w-full">
        <ProfileName customer={customer} />
        {/* <Divider />
        <ProfileEmail customer={customer} /> */}
        <Divider />
        <ProfilePhone customer={customer} />
        {/* <Divider />
        <ProfilePassword customer={customer} /> */}
        <Divider />
        <ProfileBillingAddress customer={customer} regions={regions} />
      </div>
    </div>
  );
}

const Divider = () => {
  return <div className="w-full h-px bg-gray-200" />;
};
