import { CreatePostInput } from "@/features/post/types";
import { api } from "@/lib/api"; 


export const createPost = async (input: CreatePostInput) => {
  const form = new FormData();

  form.append("title", input.title.trim());
  form.append("content", input.content); // HTML ok
  form.append("tags", input.tags.map((t) => t.trim()).filter(Boolean).join(","));
  form.append("image", input.image, input.image.name);

  const res = await api.post("/posts", form,{
            headers: {
      "Content-Type": undefined as unknown as string,
    },
  });


  return res.data;
};
