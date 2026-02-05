import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RegisterPayload } from "@/features/auth/types";
import { register } from "@/features/auth/api";

export const useRegister = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const res = await register(payload);
      return res;
    },
  });
};
