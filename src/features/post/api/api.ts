import { CreatePostInput } from "@/features/post/types";
import { api } from "@/lib/api"; 


export const createPost = async (input: CreatePostInput) => {
  const form = new FormData();

  form.append("title", input.title.trim());
  form.append("content", input.content); // HTML ok
  form.append("tags", input.tags.map((t) => t.trim()).filter(Boolean).join(","));
  if(input.image) form.append("image", input.image, input.image.name);

  const res = await api.post("/posts", form,{
            headers: {
      "Content-Type": undefined as unknown as string,
    },
  });


  return res.data;
};



export const updatePost = async (
  postId: number,
  payload: CreatePostInput
): Promise<void> => {
  const fd = new FormData();

  fd.append("title", payload.title);
  fd.append("content", payload.content);
  fd.append("tags", payload.tags.join(",")); 

  if (payload.image) {
    fd.append("image", payload.image);
  }
  
  await api.patch(`/posts/${postId}`, fd, {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  });
};
