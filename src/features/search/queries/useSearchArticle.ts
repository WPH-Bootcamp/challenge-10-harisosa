import { useQuery } from "@tanstack/react-query";
import { searchArticles } from "@/features/search/api/api";
import { searchKeys } from "@/features/search/queries/search-keys";
import { SearchArticlesParams } from "../types/search";

export const useSearchArticles = (params :SearchArticlesParams) => {
  return useQuery({
    queryKey: searchKeys.list(params),
    queryFn: () => searchArticles(params),
    enabled: params.query.trim().length > 0,
    staleTime: 30_000,
  });
};
