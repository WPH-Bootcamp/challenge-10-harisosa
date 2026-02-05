"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FormField } from "@/shared/components/forms";

type PasswordFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
};

export const PasswordField: React.FC<PasswordFieldProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  autoComplete,
  error,
}) => {
  const [show, setShow] = useState(false);

  return (
    <FormField
      id={id}
      label={label}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={show ? "text" : "password"}
      autoComplete={autoComplete}
      error={error}
      rightSlot={
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="text-muted-foreground hover:text-foreground"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      }
    />
  );
};
