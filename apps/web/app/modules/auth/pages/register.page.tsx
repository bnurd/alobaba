import { useForm } from "@tanstack/react-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

import { useRegister } from "~/modules/auth/mutations/use-register";
import { registerSchema } from "~/modules/auth/validations";
import FieldError from "~/shared/components/field-error";
import { Button } from "~/shared/ui/button";
import { Label } from "~/shared/ui/label";
import { TextField } from "~/shared/ui/text-field";

export default function RegisterPage() {
  const registerMutation = useRegister();

  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phone: "",
    },
    validators: {
      onChange: registerSchema,
    },
    onSubmit({ value }) {
      registerMutation.mutate(
        {
          email: value.email,
          password: value.password,
          name: value.name,
          phone: value.phone,
        },
        {
          onSuccess: () => {
            toast.success("Sign Up successful. Please sign in to continue");
            void navigate("/sign-in");
          },
          onError: err => {
            toast.error(err.message || "Something went wrong");
          },
        }
      );
    },
  });

  return (
    <div className="mx-auto mt-5 w-full px-4 md:mt-12 md:w-1/2 md:px-6 lg:w-1/3">
      <title>Sign Up - Alobaba</title>
      <h2 className="mb-8 text-center text-2xl font-semibold">Sign Up</h2>
      <form
        onSubmit={async e => {
          e.preventDefault();
          e.stopPropagation();
          await form.handleSubmit();
        }}
      >
        <form.Field name="name">
          {field => (
            <div className="mb-5">
              <Label className="mb-2" htmlFor={field.name}>
                Name
              </Label>
              <TextField
                id={field.name}
                placeholder="Enter your name"
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                isError={field.state.meta.isTouched && !field.state.meta.isValid}
              />
              <FieldError field={field} />
            </div>
          )}
        </form.Field>
        <form.Field name="phone">
          {field => (
            <div className="mb-5">
              <Label className="mb-2" htmlFor={field.name}>
                Phone
              </Label>
              <TextField
                id={field.name}
                placeholder="Enter your phone"
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                isError={field.state.meta.isTouched && !field.state.meta.isValid}
              />
              <FieldError field={field} />
            </div>
          )}
        </form.Field>
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
          isLoading={registerMutation.isPending}
          disabled={registerMutation.isSuccess}
        >
          Sign Up
        </Button>
      </form>
      <Link to="/sign-in" className="mt-4 flex justify-center text-center text-sm text-gray-500">
        Have an account? <span className="ml-1 underline">Sign In</span>
      </Link>
    </div>
  );
}
