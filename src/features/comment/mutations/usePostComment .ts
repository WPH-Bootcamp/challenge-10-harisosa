import { postComment } from "@/features/comment/api/api";
import { commentKeys } from "@/hooks/comment-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const usePostComment = (postId: number) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => postComment(postId, content),

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: commentKeys.posts.comments(postId),
      });
    },
  });
};
