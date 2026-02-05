export type CreatePostInput = {
  title: string;
  content: string;
  tags: string[]; 
  image: File | null;
  imageUrl?: string;
};