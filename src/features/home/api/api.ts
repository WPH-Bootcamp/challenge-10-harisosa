import type { Article, ArticlesListResponse } from "@/features/home/types/article";
import { api } from "@/lib";

export type GetArticlesParams = {
  page: number;
  limit: number;
};

export const getRecommendedArticles = async (
  params: GetArticlesParams
): Promise<ArticlesListResponse> => {
  const res = await api.get<ArticlesListResponse>("posts/recommended", {
    params: { page: params.page, limit: params.limit },
  });

  return res.data;
};

export const getMostLikedArticles = async (): Promise<ArticlesListResponse> => {
  const res = await api.get<ArticlesListResponse>("/posts/most-liked");
  return res.data;
};
