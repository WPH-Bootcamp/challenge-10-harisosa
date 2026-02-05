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