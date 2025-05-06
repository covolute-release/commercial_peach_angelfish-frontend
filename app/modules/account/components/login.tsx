import ErrorMessage from "@/modules/checkout/components/error-message";
import { SubmitButton } from "@/modules/checkout/components/submit-button";
import Input from "@/modules/common/components/input";
import { useFetcher, Link } from "@remix-run/node";

const Login = () => {
  const fetcher = useFetcher();

  return (
    <div className="max-w-sm w-full flex flex-col items-center" data-testid="login-page">
      <h1 className="text-large-semi uppercase mb-6">Welcome back</h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-8">
        Sign in to access an enhanced shopping experience.
      </p>
      <fetcher.Form className="w-full" method="post">
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="Email"
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            required
            data-testid="email-input"
            autoFocus
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={fetcher.data} data-testid="login-error-message" />
        <SubmitButton data-testid="sign-in-button" className="w-full mt-6">
          Sign in
        </SubmitButton>
      </fetcher.Form>
      <span className="text-center text-ui-fg-base text-small-regular mt-6">
        Not a member?{" "}
        <Link to="../signup" className="underline" data-testid="register-button">
          Join us
        </Link>
        .
      </span>
    </div>
  );
};

export default Login;
