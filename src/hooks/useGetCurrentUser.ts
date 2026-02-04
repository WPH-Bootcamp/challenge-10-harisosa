"use client";

import { useQuery } from "@tanstack/react-query";

import { authStorage } from "@/lib/auth-storage"
import { getAuthUser } from "../features/auth/api/api";
import { userKeys } from "@/hooks/user-keys";

export const useGetCurrentUser = () => {
  const hasToken = !!authStorage.getToken();

  return useQuery({
    queryKey: userKeys.me(),
    queryFn: getAuthUser,
    enabled: hasToken,
    staleTime: 5 * 60 * 1000,
  });
};
