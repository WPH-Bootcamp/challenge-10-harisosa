import { api } from "@/lib";
import { Article } from "../types";


export const getArticleById = async (id: number): Promise<Article> => {
  const res = await api.get<Article>(`/posts/${id}`);
  return res.data;
};

export const likePostApi = async (postId: number) => {
  // body kosong -> kirim null
  const res = await api.post(`/posts/${postId}/like`);
  return res.data;
};