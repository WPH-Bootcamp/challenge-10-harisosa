"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PasswordField } from "@/shared/components/forms";
import { PasswordFields } from "@/features/profile/constants";
import { useUpdatePassword } from "@/features/profile/mutations/useUpdatePassword";

type PasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export const ChangePassword: React.FC = () => {
  const m = useUpdatePassword();

  const [model, setModel] = useState<PasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof PasswordForm, string>>>({});

  const setValue = <K extends keyof PasswordForm>(key: K, value: string) => {
    setModel((prev) => ({ ...prev, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = async () => {
    if (model.newPassword !== model.confirmPassword) {
      setErrors({ confirmPassword: "Password does not match" });
      return;
    }

    await m.mutateAsync(model);
    setModel({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="flex justify-center">
      <div className="w-full space-y-5">
        {PasswordFields.map((f) => (
          <PasswordField
            key={f.key}
            id={f.key}
            label={f.label}
            value={model[f.key]}
            onChange={(v) => setValue(f.key, v)}
            placeholder={f.placeholder}
            autoComplete={f.autoComplete}
            error={errors[f.key]}
          />
        ))}

        <Button
          onClick={onSubmit}
          disabled={m.isPending}
          className="mt-6 w-full rounded-full bg-sky-600 hover:bg-sky-700"
        >
          {m.isPending ? "Updating..." : "Update Password"}
        </Button>
      </div>
    </div>
  );
};
