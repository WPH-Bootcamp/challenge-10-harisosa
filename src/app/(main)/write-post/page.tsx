"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "@/shared/components/forms/RichtextEditor";
import { CoverImageField } from "@/features/post/components/CoverImageField";
import { TagsInput } from "@/features/post/components/TagsInput";
import { FormField } from "@/shared/components/forms";
import { useCreatePost } from "@/features/post/mutations/useCreatePost";

const WritePostPage: React.FC = () => {
  const { mutateAsync, isPending } = useCreatePost();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [cover, setCover] = useState<File | null>(null);

  const [errors, setErrors] = useState<{
    title?: string;
    content?: string;
    cover?: string;
    tags?: string;
  }>({});

  
const onSubmit = async () => {
  if (!validate()) return;

  await mutateAsync({
    title,
    content,
    tags,
    image: cover!,
  });

};

  const validate = () => {
    const e: typeof errors = {};

    if (!title.trim()) e.title = "Title is required";
    const contentText = content.replace(/<[^>]+>/g, "").trim();
    if (!contentText) e.content = "Content is required";

    if (!cover) e.cover = "Cover image is required";
    if (tags.length === 0) e.tags = "At least 1 tag is required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <div className="px-4 md:px-8 py-8">
      <div className=" w-full space-y-6">
        <div className="space-y-2">
          <FormField
            id='title'
            label="Title"
            value={title} onChange={(value) => setTitle(value)} error={errors.title} />
        </div>

        <div className="space-y-2">
          <Label>Content</Label>
          <RichTextEditor value={content} onChange={setContent} error={errors.content} />
        </div>

        <div className="space-y-2">
          <Label>Cover Image</Label>
          <CoverImageField
            value={cover}
            onChange={(f: File | null) => {
              setCover(f);
              setErrors({});
            }}
            error={errors.cover}
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Tags</Label>
          <TagsInput value={tags} onChange={setTags} error={errors.tags} />
        </div>

        <div className="flex justify-end">
          <Button
            onClick={onSubmit}
            disabled={isPending}
            className="rounded-full bg-sky-600 hover:bg-sky-700 px-10"
          >
             {isPending ? "Saving..." : "Finish"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WritePostPage;
