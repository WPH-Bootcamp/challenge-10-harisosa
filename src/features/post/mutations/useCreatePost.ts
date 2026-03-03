import { createPost } from "@/features/post/api";
import { CreatePostInput } from "@/features/post/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";


export const useCreatePost = () => {
   const router = useRouter();
  return useMutation({
    mutationFn: (input: CreatePostInput) => createPost(input),
    onSuccess: () => {
      router.push("/");
    },
  });
};
