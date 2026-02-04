import { api } from "@/lib";
import { CommentModel } from "../types/comment";

export const GetCommentByPostId = async (postId: number) => {
          const res = await api.get<CommentModel[]>(`/posts/${postId}/comments`);
      return res.data;
}


export const postComment = async (
  postId: number,
  content: string
) => {
  const res = await api.post(`/comments/${postId}`,{content});
  return res.data;
};