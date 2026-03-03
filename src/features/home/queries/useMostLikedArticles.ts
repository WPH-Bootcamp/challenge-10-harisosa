import { useQuery } from "@tanstack/react-query";
import { getMostLikedArticles } from "@/features/home/api";
import { homeArticleKeys } from "@/features/home/queries/article-keys";

export const useMostLikedArticles = () => {
  return useQuery({
    queryKey: homeArticleKeys.mostLiked(),
    queryFn: () => getMostLikedArticles(),
    staleTime: 60_000,
  });
};
