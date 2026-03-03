export const commentKeys = {
  posts: {
    all: ["posts"] as const,

    detail: (postId: number) =>
      [...commentKeys.posts.all, postId] as const,

    comments: (postId: number) =>
      [...commentKeys.posts.detail(postId), "comments"] as const,
  },
};
