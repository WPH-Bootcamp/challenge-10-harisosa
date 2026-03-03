import { AuthUserResponse } from "@/features/auth/types";
import { CommentModel } from "@/features/comment/types";
import { api } from "@/lib";

export const GetCommentByPostId = async (postId: number) => {
          const res = await api.get<CommentModel[]>(`/posts/${postId}/comments`);
      return res.data;
}


export const getAuthUser = async (): Promise<AuthUserResponse> => {
  const { data } = await api.get<AuthUserResponse>("/users/me");
  return data;
};
