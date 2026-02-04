export const profileKeys = {
  all: ["profile"] as const,

  myPosts: (params: { page: number; limit: number }) =>
    [...profileKeys.all, "my-posts", params] as const,
};
