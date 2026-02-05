export const articleKeys = {
  all: ["articles"] as const,
  detail: (id: string | number) => ["articles", "detail", id] as const,
  comments: (id: string | number) => ["articles", "comments", id] as const,
  related: (id: string | number) => ["articles", "related", id] as const,
};
