"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePostApi } from "../api";


export const useLikePost = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => likePostApi(postId),

    onSuccess: (_data, postId) => {
      qc.invalidateQueries({ queryKey: ["articles"] });
      qc.invalidateQueries({ queryKey: ["article", postId] });
    },
  });
};
