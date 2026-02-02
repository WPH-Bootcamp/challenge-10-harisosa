
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  authStorage } from "@/lib";
import { LoginPayload } from "@/features/auth/types";
import { login } from "@/features/auth/api";
import { authQueryKeys } from "../queries";

export const useLogin = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const res = await login(payload);
      return res;
    },
    onSuccess: (data) => {
      authStorage.setToken(data.token);
      qc.invalidateQueries({
        queryKey: authQueryKeys.me(),
      });
    },
  });
};
