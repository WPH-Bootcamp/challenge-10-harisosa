export type ArticleAuthor = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type Article = {
  id: number;
  title: string;
  content: string;
  tags: string[];
  imageUrl: string;
  imagePublicId: string;
  createdAt: string; // ISO
  likes: number;
  comments: number;
  author: ArticleAuthor;
};

export type ArticlesListResponse = {
  data: Article[];
  total: number;
  page: number;
  lastPage: number;
};
