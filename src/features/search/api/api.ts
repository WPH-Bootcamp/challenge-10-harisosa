

import { SearchArticlesParams } from "@/features/search/types/search";
import { api } from "@/lib";
import { ArticlesListResponse } from "@/shared/types";


export const searchArticles = async (
  params: SearchArticlesParams
): Promise<ArticlesListResponse> => {
  const res = await api.get<ArticlesListResponse>("/posts/search", {
    params: {
      search: params.query,
      page: params.page,
      limit: params.limit,
    },
  });

  return res.data;
};
