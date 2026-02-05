"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";

export type TabItem<T extends string> = {
  key: T;
  label: string;
  icon?: LucideIcon;
  disabled?: boolean;
  badge?: number; // optional, buat (20) dll
};

type TabsProps<T extends string> = {
  value: T;
  onChange: (value: T) => void;
  items: TabItem<T>[];
  className?: string;
};

export const Tabs = <T extends string,>({
  value,
  onChange,
  items,
  className,
}: TabsProps<T>) => {
  return (
    <div className={["flex w-full justify-center", className].filter(Boolean).join(" ")}>
      <div className="w-full">
        <div className="flex items-center gap-3 border-b">
          {items.map((it) => {
            const active = it.key === value;
            const Icon = it.icon;

            return (
              <Button
                key={it.key}
                type="button"
                variant="ghost"
                disabled={it.disabled}
                onClick={() => onChange(it.key)}
                className={[
                  "w-70.5",
                  "rounded-none px-3 pb-3 pt-2 text-sm font-medium",
                  "border-b-2 -mb-px transition-colors",
                  active
                    ? "border-primary-300 text-primary-300"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                {Icon ? <Icon className="mr-2 h-4 w-4" /> : null}
                <span>{it.label}</span>
                {typeof it.badge === "number" ? (
                  <span className="ml-2 text-muted-foreground">({it.badge})</span>
                ) : null}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
