"use client";

import React, { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Props = {
  value: File | null;
  onChange: (file: File | null) => void;
  required?: boolean;
  error?: string;
  previewUrl?: string | null;

  maxMb?: number;
};

export const CoverImageField: React.FC<Props> = ({
  value,
  onChange,
  required = false,
  error,
  previewUrl,
  maxMb = 5,
}) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const displayUrl = useMemo(() => {
    if (value) return URL.createObjectURL(value);
    return previewUrl ?? null;
  }, [value, previewUrl]);

  const openPicker = () => fileRef.current?.click();

  const validate = (file: File) => {
    const okType =
      file.type === "image/png" ||
      file.type === "image/jpeg" ||
      file.type === "image/jpg";
    const okSize = file.size <= maxMb * 1024 * 1024;

    if (!okType) return `Only PNG or JPG is allowed.`;
    if (!okSize) return `Max file size is ${maxMb}mb.`;
    return null;
  };

  const setFile = (file: File) => {
    const msg = validate(file);
    if (msg) {
      // biar parent yang nentuin error text final,
      // tapi minimal jangan simpen file invalid
      onChange(null);
      alert(msg);
      return;
    }
    onChange(file);
  };

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    e.target.value = "";
  };

  const onDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) setFile(f);
  };

  const hasImage = Boolean(displayUrl);

  return (
    <div className="space-y-1">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        className={cn(
          "w-full rounded-md border border-dashed bg-background px-6 py-6",
          error
            ? "border-rose-500"
            : "border-muted-foreground/30 hover:border-muted-foreground/60",
          isDragging && "bg-muted/40"
        )}
      >
        {/* EMPTY state */}
        {!hasImage && (
          <button
            type="button"
            onClick={openPicker}
            className="w-full py-6 flex flex-col items-center justify-center text-center"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border">
              <Upload className="h-5 w-5 text-muted-foreground" />
            </div>

            <div className="mt-2 text-sm">
              <span className="font-medium text-sky-600">Click to upload</span>{" "}
              or drag and drop
            </div>

            <div className="mt-1 text-xs text-muted-foreground">
              PNG or JPG (max. {maxMb}mb)
            </div>
          </button>
        )}

        {/* UPLOADED state */}
        {hasImage && (
          <div className="flex flex-col items-center">
            <div className="relative w-full aspect-video overflow-hidden rounded-md bg-slate-100">
              <Image
                src={displayUrl!}
                alt="Cover preview"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>

            <div className="mt-4 flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                className="h-8"
                onClick={openPicker}
              >
                <Upload className="mr-2 h-4 w-4" />
                Change Image
              </Button>

              <Button
                type="button"
                variant="outline"
                className="h-8 text-rose-600 hover:text-rose-700"
                onClick={() => onChange(null)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Image
              </Button>
            </div>

            <div className="mt-2 text-xs text-muted-foreground">
              PNG or JPG (max. {maxMb}mb)
            </div>
          </div>
        )}
      </div>

      {/* helper text */}
      {error ? (
        <p className="text-xs text-rose-500">{error}</p>
      ) : required ? (
        <p className="text-xs text-muted-foreground">Required</p>
      ) : null}

      <Input
        ref={fileRef}
        type="file"
        accept="image/png,image/jpeg"
        className="hidden"
        onChange={onFileChange}
      />
    </div>
  );
};
