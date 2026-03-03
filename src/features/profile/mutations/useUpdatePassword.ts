import { updatePassword } from "@/features/profile/api";
import { UpdatePasswordInput } from "@/features/profile/types";
import { useMutation } from "@tanstack/react-query";

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: (input: UpdatePasswordInput) => updatePassword(input),
  });
};
