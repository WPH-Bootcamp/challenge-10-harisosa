import { useQuery } from "@tanstack/react-query";
import { GetCommentByPostId } from "../api/api";
import { commentKeys } from "./comment-keys";
import { CommentModel } from "../types/comment";

export const useGetComments = (postId: number, enabled = true) => {
  return useQuery({
    queryKey: commentKeys.posts.comments(postId),
    enabled: enabled && postId > 0,
    queryFn: () => GetCommentByPostId(postId),
    select: (data: CommentModel[]) => {
      return [...data].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      );
    },
    staleTime:10_000
  });
};
