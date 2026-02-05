import { updateProfile } from "@/features/profile/api";
import { UpdateProfileInput } from "@/features/profile/types";
import { userKeys } from "@/hooks/user-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateProfile = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateProfileInput) => updateProfile(input),
        onSuccess: () => {
          qc.invalidateQueries({ queryKey: userKeys.me() });
        },
  });
};
