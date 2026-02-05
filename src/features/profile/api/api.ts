import {
  MyPostsParams,
  UpdateProfileInput,
  UpdatePasswordInput,
  PostLikeUser,
  GetPostsByUserParams,
  GetPostsByUserResponse,
} from "@/features/profile/types";
import { api } from "@/lib";
import { Article, ArticlesListResponse } from "@/shared/types";
import { UserModel } from "@/shared/types/user";

export const getMyPosts = async (params: MyPostsParams) => {
  const res = await api.get<ArticlesListResponse>("/posts/my-posts", {
    params,
  });
  return res.data;
};

export const updateProfile = async (input: UpdateProfileInput) => {
  const form = new FormData();

  console.log(input.avatar?.name, input.avatar?.type, input.avatar?.size);

  form.append("name", input.name);
  form.append("headline", input.headline);
  if (input.avatar) form.append("avatar", input.avatar);

  const res = await api.patch("/users/profile", form, {
    headers: {
      "Content-Type": undefined as unknown as string,
    },
  });
  return res.data;
};

export const updatePassword = async (input: UpdatePasswordInput) => {
  const res = await api.patch("/users/password", input);
  return res.data;
};

export const deletePost = async (postId: number | string) => {
  const res = await api.delete(`/posts/${postId}`);
  return res.data;
};

export const getPostLikes = async (postId: number): Promise<PostLikeUser[]> => {
  const { data } = await api.get<PostLikeUser[]>(`/posts/${postId}/likes`);

  return data;
};

export const getUserById = async (userId: number): Promise<UserModel> => {
  const res = await api.get<UserModel>(`/users/${userId}`);
  return res.data;
};

export const getPostsByUser = async ({
  userId,
  page = 1,
  limit = 10,
}: GetPostsByUserParams): Promise<GetPostsByUserResponse> => {
  const res = await api.get<GetPostsByUserResponse>(
    `/posts/by-user/${userId}`,
    {
      params: { page, limit },
    },
  );
  const { data, user,page: currentPage ,limit: currentLimitt, total } = res.data;

  return {
    user,
    page: currentPage,
    limit: currentLimitt,
    total,
    data: data.map((article: Article) => ({
      ...article,
      author: user,
    })),
  };
};
