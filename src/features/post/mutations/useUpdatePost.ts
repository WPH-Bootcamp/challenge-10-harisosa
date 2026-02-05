"use client";

import { updatePost } from "@/features/post/api";
import { CreatePostInput } from "@/features/post/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";



export const useUpdatePost = (postId: number) => {
    const router = useRouter();
  return useMutation({
    mutationFn: (payload: CreatePostInput) => updatePost(postId,payload),
    onSuccess: async () => {
      router.push("/");
    },
  });
};
