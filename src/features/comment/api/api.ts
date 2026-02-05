import { api } from "@/lib";

export const postComment = async (
  postId: number,
  content: string
) => {
  const res = await api.post(`/comments/${postId}`,{content});
  return res.data;
};