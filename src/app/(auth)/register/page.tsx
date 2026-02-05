"use client";

import { useRouter } from "next/navigation";
import { AuthContainer } from "@/features/auth/components/AuthContainer";
import { AuthCard } from "@/features/auth/components/AuthCard";
import { AuthForm } from "@/features/auth/components/AuthForm";
import { AuthValues } from "@/features/auth/components/AuthFormModel";
import { useRegister } from "@/features/auth/mutations";

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const registerMutation = useRegister();

  const submitError = (() => {
    const err: any = registerMutation.error;
    return err?.response?.data?.message || err?.message || undefined;
  })();

  return (
    <AuthContainer>
      <AuthCard title="Sign Up">
        <AuthForm
          mode="register"
          isPending={registerMutation.isPending}
          submitError={submitError}
          onSubmit={(values: AuthValues) => {
            registerMutation.mutate(
              {
                name: values.name ?? "",
                email: values.email,
                password: values.password,
              },
              {
                onSuccess: () => {
                  // Decide your UX: go to login or go home
                  router.push("/login");
                },
              }
            );
          }}
        />
      </AuthCard>
    </AuthContainer>
  );
};

export default RegisterPage;
