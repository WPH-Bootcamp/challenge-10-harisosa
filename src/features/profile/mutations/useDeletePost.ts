import { deletePost } from "@/features/profile/api";
import { profileKeys } from "@/features/profile/queries/profile-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeletePost = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (postId: number | string) => deletePost(postId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: profileKeys.all });
    },
  });
};
