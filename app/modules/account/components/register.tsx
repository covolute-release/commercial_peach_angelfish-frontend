import Input from "@/modules/common/components/input";
import ErrorMessage from "@/modules/checkout/components/error-message";
import { SubmitButton } from "@/modules/checkout/components/submit-button";
import LocalizedClientLink from "@/modules/common/components/localized-client-link";
import { Link, useFetcher } from "@remix-run/node";

const Register = () => {
  const fetcher = useFetcher();

  return (
    <div className="max-w-sm flex flex-col items-center" data-testid="register-page">
      <h1 className="text-large-semi uppercase mb-6">Become a Medusa Store Member</h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-4">
        Create your Medusa Store Member profile, and get access to an enhanced shopping experience.
      </p>
      <fetcher.Form className="w-full flex flex-col" method="post">
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="First name"
            name="first_name"
            required
            autoComplete="given-name"
            autoFocus
            data-testid="first-name-input"
          />
          <Input label="Last name" name="last_name" required autoComplete="family-name" data-testid="last-name-input" />
          <Input label="Email" name="email" required type="email" autoComplete="email" data-testid="email-input" />
          <Input label="Phone" name="phone" type="tel" autoComplete="tel" data-testid="phone-input" />
          <Input
            label="Password"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={fetcher.data} data-testid="register-error" />
        <span className="text-center text-ui-fg-base text-small-regular mt-6">
          By creating an account, you agree to Medusa Store&apos;s{" "}
          <LocalizedClientLink href="/content/privacy-policy" className="underline">
            Privacy Policy
          </LocalizedClientLink>{" "}
          and{" "}
          <LocalizedClientLink href="/content/terms-of-use" className="underline">
            Terms of Use
          </LocalizedClientLink>
          .
        </span>
        <SubmitButton className="w-full mt-6" data-testid="register-button">
          Join
        </SubmitButton>
      </fetcher.Form>
      <span className="text-center text-ui-fg-base text-small-regular mt-6">
        Already a member?{" "}
        <Link to="../signin" className="underline">
          Sign in
        </Link>
        .
      </span>
    </div>
  );
};

export default Register;
