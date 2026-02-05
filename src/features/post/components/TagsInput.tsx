"use client";

import React, { useMemo, useState } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;

  required?: boolean;
  error?: string;
};

const normalize = (s: string) => s.trim().replace(/\s+/g, " ");

export const TagsInput: React.FC<Props> = ({
  value,
  onChange,
  placeholder = "Press Enter to add tag",
  required = false,
  error,
}) => {
  const [draft, setDraft] = useState("");
  const tags = useMemo(() => value ?? [], [value]);

  const addTag = (raw: string) => {
    const t = normalize(raw);
    if (!t) return;

    const exists = tags.some((x) => x.toLowerCase() === t.toLowerCase());
    if (exists) {
      setDraft("");
      return;
    }

    onChange([...tags, t]);
    setDraft("");
  };

  const removeTag = (t: string) => onChange(tags.filter((x) => x !== t));

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(draft);
      return;
    }

    if (e.key === "Backspace" && !draft && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  return (
    <div className="space-y-1">
      <div
        className={cn(
          "w-full rounded-md border bg-background px-3 py-2 flex flex-wrap items-center gap-2",
          error ? "border-rose-500" : "border-input"
        )}
      >
        {tags.map((t) => (
          <Badge key={t} variant="outline" className="gap-1 rounded-full">
            {t}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-5 w-5 rounded-full"
              onClick={() => removeTag(t)}
              aria-label={`Remove ${t}`}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}

        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="h-8 w-55 border-0 px-0 shadow-none focus-visible:ring-0"
        />
      </div>

      {error ? (
        <p className="text-xs text-rose-500">{error}</p>
      ) : required ? (
        <p className="text-xs text-muted-foreground">Required</p>
      ) : null}
    </div>
  );
};
