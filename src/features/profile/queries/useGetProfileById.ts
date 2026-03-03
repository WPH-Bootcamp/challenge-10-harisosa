
"use client";

import { getUserById } from "@/features/profile/api";
import { profileKeys } from "@/features/profile/queries/profile-keys";
import { useQuery } from "@tanstack/react-query";

export const useGetUserById = (userId: number, enabled = true) => {
  return useQuery({
    queryKey: profileKeys.detail(userId),
    queryFn: () => getUserById(userId),
    enabled: enabled && userId > 0,
  });
};
