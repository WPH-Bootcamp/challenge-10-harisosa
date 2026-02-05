export const profileKeys = {
  all: ["profile"] as const,

  myPosts: (params: { page: number; limit: number }) =>
    [...profileKeys.all, "my-posts", params] as const,
  detail: (userId: number) => [...profileKeys.all, "detail", userId] as const,
  byUser: (userId: number, page: number, limit: number) =>
    [...profileKeys.all, "by-user", userId, page, limit] as const,
};
