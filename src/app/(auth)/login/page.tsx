"use client";

import { useRouter } from "next/navigation";
import { AuthContainer } from "@/features/auth/components/AuthContainer";
import { AuthCard } from "@/features/auth/components/AuthCard";
import { AuthForm } from "@/features/auth/components/AuthForm";
import { useLogin } from "@/features/auth/mutations";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const loginMutation = useLogin();

  const submitError = (() => {
    const err: any = loginMutation.error;
    if (err?.response?.data?.message) {
      return err.response.data.message;
    }

    if (typeof err?.message === "string") {
      return err.message;
    }
    return undefined;
  })();

  return (
    <AuthContainer>
      <AuthCard title="Sign In">
        <AuthForm
          mode="login"
          isPending={loginMutation.isPending}
          submitError={submitError}
          onSubmit={(values) => {
            loginMutation.mutate(
              { email: values.email, password: values.password },
              { onSuccess: () => router.push("/") }
            );
          }}
        />
      </AuthCard>
    </AuthContainer>
  );
};

export default LoginPage;
