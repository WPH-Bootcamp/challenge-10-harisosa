import { api } from "@/lib";
import { MyPostsParams, UpdateProfileInput, UpdatePasswordInput } from "../types";
import { ArticlesListResponse } from "@/shared/types";



export const getMyPosts = async (params: MyPostsParams) => {
  const res = await api.get<ArticlesListResponse>("/posts/my-posts", { params });
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
