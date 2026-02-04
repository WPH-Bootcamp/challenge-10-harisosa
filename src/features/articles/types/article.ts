import { Article } from "@/shared/types/article";

export type ArticlesListResponse = {
  data: Article[];
  total: number;
  page: number;
  lastPage: number;
};
