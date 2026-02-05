"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { homeArticleKeys } from "@/features/home/queries/article-keys";
import { Article, ArticlesListResponse } from "@/shared/types";
import { likePostApi } from "@/features/articles/api";
import { articleKeys } from "@/features/articles/queries/article-keys";


export const useLikePost = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => likePostApi(id),

    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: articleKeys.all });

      const prevDetail = qc.getQueryData<Article>(articleKeys.detail(id));
      const prevLists = qc.getQueriesData<ArticlesListResponse>({
        queryKey: homeArticleKeys.all,
      });    

      qc.setQueryData<Article>(articleKeys.detail(id), (old) => {
        if (!old) return old;
        return { ...old, likes: old.likes + 1 };
      });

      qc.setQueriesData<ArticlesListResponse>(
        { queryKey: homeArticleKeys.all },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            data: old.data.map((a) =>
              a.id === id ? { ...a, likes: a.likes + 1 } : a
            ),
          };
        }
      );

      return { prevDetail, prevLists };
    },

    onError: (_err, id, ctx) => {
      if (!ctx) return;

      qc.setQueryData(articleKeys.detail(id), ctx.prevDetail);
      ctx.prevLists.forEach(([key, data]) => {
        qc.setQueryData(key, data);
      });
    },

  });
};
