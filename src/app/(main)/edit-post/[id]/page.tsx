"use client";

import { useArticleDetail } from "@/features/articles/queries";
import { PostForm } from "@/features/post/components/PostForm";
import { useUpdatePost } from "@/features/post/mutations/useUpdatePost";
import { useParams } from "next/navigation";

const EditPostPage = () => {
    const params = useParams<{ id: string }>();
    const postId = Number(params?.id);

    const { data: post } = useArticleDetail(postId);
    const { mutateAsync, isPending } = useUpdatePost(postId);

    if (!post) return null;

    return (
        <div className="px-4 md:px-8 py-8">
            <PostForm
                key={post.id} // 🔑 reset form when post loaded
                initialValues={{
                    title: post.title,
                    content: post.content,
                    tags: post.tags,
                    imageUrl: post.imageUrl
                }}
                submitLabel="Update"
                isSubmitting={isPending}
                onSubmit={(value) => {

                    return mutateAsync(value);
                }}
            />
        </div>
    );
};

export default EditPostPage;
