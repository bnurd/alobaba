import { useForm } from "@tanstack/react-form";

import { useLogin } from "~/modules/auth/mutations/use-login";
import { signInSchema } from "~/modules/auth/validations";
import FieldError from "~/shared/components/field-error";
import { Button } from "~/shared/ui/button";
import { Label } from "~/shared/ui/label";
import { TextField } from "~/shared/ui/text-field";

export default function LoginPage() {
  const loginMutation = useLogin();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onChange: signInSchema,
    },
    onSubmit({ value }) {
      loginMutation.mutate({
        email: value.email,
        password: value.password,
      });
    },
  });

  return (
    <div className="mx-auto mt-32 w-full px-4 md:mt-40 md:w-1/2 md:px-6">
      <h2 className="mb-8 text-center text-2xl font-semibold">Sign In</h2>
      <form
        onSubmit={async e => {
          e.preventDefault();
          e.stopPropagation();
          await form.handleSubmit();
        }}
      >
        <form.Field name="email">
          {field => (
            <div className="mb-5">
              <Label className="mb-2" htmlFor={field.name}>
                Email
              </Label>
              <TextField
                id={field.name}
                placeholder="Enter your email"
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                isError={field.state.meta.isTouched && !field.state.meta.isValid}
              />
              <FieldError field={field} />
            </div>
          )}
        </form.Field>
        <form.Field name="password">
          {field => (
            <div className="mb-5">
              <Label className="mb-2" htmlFor={field.name}>
                Password
              </Label>
              <TextField
                id={field.name}
                placeholder="Enter your password"
                type="password"
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                isError={field.state.meta.isTouched && !field.state.meta.isValid}
              />
              <FieldError field={field} />
            </div>
          )}
        </form.Field>
        <Button
          type="submit"
          className="w-full"
          isLoading={loginMutation.isPending}
          disabled={loginMutation.isSuccess}
        >
          Sign In
        </Button>
      </form>
    </div>
  );
}
