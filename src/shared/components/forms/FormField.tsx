"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { InputHTMLAttributes, ReactNode } from "react";

export type FormFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  rightSlot?: ReactNode;
  containerClassName?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "value" | "onChange">;

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  value,
  onChange,
  error,
  rightSlot,
  containerClassName,
  className,
  ...inputProps
}) => {
  const hasError = Boolean(error);

  return (
    <div className={cn("space-y-2", containerClassName)}>
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </Label>

      <div className="relative">
        <Input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "h-11 rounded-xl bg-white pr-10 text-sm shadow-sm",
            hasError ? "border-red-500 focus-visible:ring-red-500" : "",
            className
          )}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
          {...inputProps}
        />

        {rightSlot ? (
          <div className="absolute inset-y-0 right-3 flex items-center">
            {rightSlot}
          </div>
        ) : null}
      </div>

      {hasError && (
        <p id={`${id}-error`} className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};
