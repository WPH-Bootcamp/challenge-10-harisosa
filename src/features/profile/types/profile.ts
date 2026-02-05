import { Article } from "@/shared/types";
import { UserModel } from "@/shared/types/user";

export type MyPostsParams = {
  limit: number;
  page: number;
};

export type UpdateProfileInput = {
  name: string;
  headline: string;
  avatar?: File | null;
};

export type UpdatePasswordInput = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};



export type PostLikeUser = {
  id: number;
  name: string;
  headline: string | null;
  avatarUrl: string | null;
};


export type GetPostsByUserParams = {
  userId: number;
  page?: number;
  limit?: number;
};

export type GetPostsByUserResponse = {
  data: Article[];
  page: number;
  limit: number;
  total: number;
  user: UserModel
};