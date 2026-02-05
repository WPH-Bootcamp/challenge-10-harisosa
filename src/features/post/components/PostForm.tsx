"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "@/shared/components/forms/RichtextEditor";
import { CoverImageField } from "./CoverImageField";
import { TagsInput } from "./TagsInput";
import { FormField } from "@/shared/components/forms";
import { CreatePostInput } from "@/features/post/types";

type PostFormProps = {
  initialValues: Partial<CreatePostInput>;
  submitLabel?: string;
  isSubmitting?: boolean;
  onSubmit: (values: CreatePostInput) => Promise<void> | void;
};

export const PostForm: React.FC<PostFormProps> = ({
  initialValues,
  submitLabel = "Finish",
  isSubmitting,
  onSubmit,
}) => {
const [title, setTitle] = useState<string>(initialValues.title ?? '');
  const [content, setContent] = useState<string>(initialValues.content ?? '');
  const [tags, setTags] = useState<string[]>(initialValues?.tags ?? []);
    const [imageUrl, setImageUrl] = useState<string>(initialValues?.imageUrl ?? '')
  const [cover, setCover] = useState<File | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};

    if (!title?.trim()) e.title = "Title is required";

    const contentText = content?.replace(/<[^>]+>/g, "").trim();
    if (!contentText) e.content = "Content is required";

    if (tags.length === 0) e.tags = "At least 1 tag is required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    await onSubmit({
      title,
      content,
      tags,
      image: cover,
    });
  };

  return (
    <div className="space-y-6">
      <FormField
        id="title"
        label="Title"
        value={title}
        onChange={setTitle}
        error={errors.title}
      />

      <div className="space-y-2">
        <Label>Content</Label>
        <RichTextEditor
          value={content}
          onChange={setContent}
          error={errors.content}
        />
      </div>

      <div className="space-y-2">
        <Label>Cover Image</Label>
        <CoverImageField
          value={cover}
          previewUrl={imageUrl}
          onChange={setCover}
          error={errors.cover}
        />
      </div>

      <div className="space-y-2">
        <Label>Tags</Label>
        <TagsInput value={tags} onChange={setTags} error={errors.tags} />
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="rounded-full bg-sky-600 hover:bg-sky-700 px-10"
        >
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </div>
  );
};
