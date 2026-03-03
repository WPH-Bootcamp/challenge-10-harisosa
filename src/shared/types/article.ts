import { Author } from "@/shared/types/author";

export type Article = {
  id: number;
  title: string;
  content: string;
  tags: string[];
  imageUrl: string;
  imagePublicId: string;
  createdAt: string;
  likes: number;
  comments: number;
  author: Author;
};


export type ArticlesListResponse = {
  data: Article[];
  total: number;
  page: number;
  lastPage: number;
};
