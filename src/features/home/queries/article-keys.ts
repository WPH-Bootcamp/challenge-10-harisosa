
export const homeArticleKeys = {
  all: ["home-articles"] as const,
  list: (params: { page: number; limit: number }) =>
    [...homeArticleKeys.all, "list", params] as const,
  mostLiked: () =>
    [...homeArticleKeys.all, "most-liked"] as const,
};