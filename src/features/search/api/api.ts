

import { api } from "@/lib";
import { SearchArticlesParams } from "../types/search";
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
