"use client";

import { useMemo, useState } from "react";

export type AuthMode = "login" | "register";

export type AuthValues = {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export type FieldType = "text" | "email" | "password";

export type AuthFieldConfig = {
  key: keyof AuthValues;
  label: string;
  placeholder: string;
  type: FieldType;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
};

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const buildFields = (mode: AuthMode): AuthFieldConfig[] => {
  if (mode === "login") {
    return [
      {
        key: "email",
        label: "Email",
        placeholder: "Enter your email",
        type: "email",
        autoComplete: "email",
        inputMode: "email",
      },
      {
        key: "password",
        label: "Password",
        placeholder: "Enter your password",
        type: "password",
        autoComplete: "current-password",
      },
    ];
  }

  return [
    {
      key: "name",
      label: "Name",
      placeholder: "Enter your name",
      type: "text",
      autoComplete: "name",
    },
    {
      key: "email",
      label: "Email",
      placeholder: "Enter your email",
      type: "email",
      autoComplete: "email",
      inputMode: "email",
    },
    {
      key: "password",
      label: "Password",
      placeholder: "Enter your password",
      type: "password",
      autoComplete: "new-password",
    },
    {
      key: "confirmPassword",
      label: "Confirm Password",
      placeholder: "Enter your confirm password",
      type: "password",
      autoComplete: "new-password",
    },
  ];
};

const validate = (mode: AuthMode, v: AuthValues) => {
  const e: Partial<Record<keyof AuthValues, string>> = {};

  if (mode === "register") {
    if (!v.name?.trim()) e.name = "Name is required.";
  }

  if (!v.email) e.email = "Email is required.";
  else if (!isValidEmail(v.email)) e.email = "Please enter a valid email address.";

  if (!v.password) e.password = "Password is required.";

  if (mode === "register") {
    if (!v.confirmPassword) e.confirmPassword = "Please confirm your password.";
    else if (v.confirmPassword !== v.password) e.confirmPassword = "Passwords do not match.";
  }

  return e;
};

export const useAuthFormModel = (mode: AuthMode) => {
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState<AuthValues>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const fields = useMemo(() => buildFields(mode), [mode]);

  const errors = useMemo(() => validate(mode, values), [mode, values]);

  const isValid = useMemo(() => {
    return Object.values(errors).every((x) => !x);
  }, [errors]);

  const setValue = (key: keyof AuthValues, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (onValid: (v: AuthValues) => void) => {
    setSubmitted(true);
    if (!isValid) return; // ✅ no API call
    onValid(values);
  };

  return {
    mode,
    fields,
    values,
    errors,
    submitted,
    setValue,
    handleSubmit,
  };
};
