
import { useQuery } from "@tanstack/react-query";

import { authStorage } from "@/lib/auth-storage"
import { getAuthUser } from "../api/api";

export const useAuthUserQuery = () => {
  const hasToken = !!authStorage.getToken();

  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: getAuthUser,
    enabled: hasToken,
    retry: false,
  });
};
