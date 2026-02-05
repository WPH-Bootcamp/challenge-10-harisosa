import { SearchArticlesParams } from "@/features/search/types/search";

const SEARCH_KEY = ["search"] as const;

export const searchKeys = {
  all: SEARCH_KEY,
  list: (params: SearchArticlesParams) =>
    [...SEARCH_KEY, "list", params] as const,
};
