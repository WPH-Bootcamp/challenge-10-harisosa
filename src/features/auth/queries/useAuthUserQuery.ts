"use client";

import { useQuery } from "@tanstack/react-query";

import { authStorage } from "@/lib/auth-storage"
import { getAuthUser } from "../api/api";
import { authQueryKeys } from "./query-keys";

export const useAuthUserQuery = () => {
  const hasToken = !!authStorage.getToken();

  return useQuery({
    queryKey: authQueryKeys.me(),
    queryFn: getAuthUser,
    enabled: hasToken,
    retry: false,
  });
};
