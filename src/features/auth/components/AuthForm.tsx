"use client";

import { Button } from "@/components/ui/button";
import { FormField } from "@/shared/components/forms/FormField";
import { PasswordField } from "@/features/auth/components/PasswordField";
import { AuthMode, AuthValues, useAuthFormModel } from "@/features/auth/components/AuthFormModel";

type AuthFormProps = {
  mode: AuthMode;
  isPending?: boolean;
  submitError?: string;
  onSubmit: (values: AuthValues) => void;
};

export const AuthForm: React.FC<AuthFormProps> = ({
  mode,
  isPending = false,
  submitError,
  onSubmit,
}) => {
  const model = useAuthFormModel(mode);

  const submitLabel = mode === "login" ? "Login" : "Register";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        model.handleSubmit((values) => onSubmit(values));
      }}
      className="space-y-4"
    >
      {model.fields.map((f) => {
        const value = String(model.values[f.key] ?? "");
        const error = model.submitted ? model.errors[f.key] ?? "" : "";

        if (f.type === "password") {
          return (
            <PasswordField
              key={String(f.key)}
              id={String(f.key)}
              label={f.label}
              value={value}
              onChange={(v) => model.setValue(f.key, v)}
              placeholder={f.placeholder}
              autoComplete={f.autoComplete}
              error={error}
            />
          );
        }

        return (
          <FormField
            key={String(f.key)}
            id={String(f.key)}
            label={f.label}
            value={value}
            onChange={(v) => model.setValue(f.key, v)}
            placeholder={f.placeholder}
            autoComplete={f.autoComplete}
            inputMode={f.inputMode}
            type={f.type}
            error={error}
          />
        );
      })}

      {submitError && (
        <p className="text-center text-xs text-red-500">{submitError}</p>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="h-11 w-full rounded-full bg-sky-600 text-white hover:bg-sky-600/90"
      >
        {isPending ? "Loading..." : submitLabel}
      </Button>

      {mode === "login" ? (
        <p className="text-center text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <a className="font-medium text-sky-600 hover:underline" href="/register">
            Register
          </a>
        </p>
      ) : (
        <p className="text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <a className="font-medium text-sky-600 hover:underline" href="/login">
            Log in
          </a>
        </p>
      )}
    </form>
  );
};
