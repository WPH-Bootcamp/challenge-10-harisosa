export type CommentModel = {
  id: number;
  content: string;
  createdAt: string;
  author: CommentAuthor;
};

export type CommentAuthor = {
  id: number;
  name: string;
  headline: string;
  avatarUrl: string | null;
};
