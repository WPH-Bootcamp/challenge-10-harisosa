// src/features/posts/queries/useGetPostsByUser.ts
"use client";

import { getPostsByUser } from "@/features/profile/api";
import { profileKeys } from "@/features/profile/queries/profile-keys";
import { useQuery } from "@tanstack/react-query";

export const useGetPostsByUser = (userId: number, page = 1,limit = 10,enabled = true) => {
  return useQuery({
    queryKey: profileKeys.byUser(userId, page, limit),
    queryFn: () => getPostsByUser({ userId, page, limit }),
    enabled: enabled && userId > 0,
  });
};
