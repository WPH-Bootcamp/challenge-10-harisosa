"use client";

import { getPostLikes } from "@/features/profile/api";
import { useQuery } from "@tanstack/react-query";


export const postLikesQueryKey = (postId: number) =>
  ["post-likes", postId] as const;

export const useGetPostLikes = (postId: number, enabled = true) => {
  return useQuery({
    queryKey: postLikesQueryKey(postId),
    queryFn: () => getPostLikes(postId),
    enabled: enabled && postId > 0,
  });
};
