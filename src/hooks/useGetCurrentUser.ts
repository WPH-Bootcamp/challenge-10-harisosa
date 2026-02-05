"use client";

import { useQuery } from "@tanstack/react-query";

import { authStorage } from "@/lib/auth-storage"
import { userKeys } from "@/hooks/user-keys";
import { getAuthUser } from "@/shared/api";

export const useGetCurrentUser = () => {
  const hasToken = !!authStorage.getToken();

  return useQuery({
    queryKey: userKeys.me(),
    queryFn: getAuthUser,
    enabled: hasToken,
    staleTime: 5 * 60 * 1000,
  });
};
