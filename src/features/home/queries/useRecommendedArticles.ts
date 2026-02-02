import { useQuery } from "@tanstack/react-query";
import { getRecommendedArticles } from "@/features/home/api";
import { homeArticleKeys } from "@/features/home/queries/article-keys";

export const useRecommendedArticles = (params: { page: number; limit: number }) => {
  return useQuery({
    queryKey: homeArticleKeys.list(params),
    queryFn: () => getRecommendedArticles(params),
    staleTime: 30_000,
  });
};