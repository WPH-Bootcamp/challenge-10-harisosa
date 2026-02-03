import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getArticleById,
} from "@/features/articles/api";
import { articleKeys } from "./article-keys";

export const useArticleDetail = (id: number) => {
  return useQuery({
    queryKey: articleKeys.detail(id),
    queryFn: () => getArticleById(id),
    enabled: Boolean(id),
    staleTime: 30_000,
  });
};

