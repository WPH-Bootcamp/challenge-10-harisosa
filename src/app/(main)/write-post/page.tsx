"use client";

import React from "react";
import { PostForm } from "@/features/post/components/PostForm";
import { useCreatePost } from "@/features/post/mutations/useCreatePost";

const WritePostPage: React.FC = () => {
  const { mutateAsync, isPending } = useCreatePost();

  return (
    <div className="px-4 md:px-8 py-8">
      <PostForm
        key="create-post"
        initialValues={
          {title: '',
          content: '',
          tags:[],
          image: null,}
        }
        submitLabel="Finish"
        isSubmitting={isPending}
        onSubmit={(values) =>
          mutateAsync({
            title: values.title,
            content: values.content,
            tags: values.tags,
            image: values.image!, 
          })
        }
      />
    </div>
  );
};

export default WritePostPage;
