import { useMutation, useQueryClient } from "@tanstack/react-query";
import { commentKeys } from "../queries/comment-keys";
import { postComment } from "../api/api";


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
