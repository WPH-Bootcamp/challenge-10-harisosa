import { api } from "@/lib";
import { Article } from "../types";


export const getArticleById = async (id: number): Promise<Article> => {
  const res = await api.get<Article>(`/posts/${id}`);
  return res.data;
};