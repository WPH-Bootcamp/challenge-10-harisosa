"use client";

import React from "react";
import { useParams } from "next/navigation";

import { ArticleDetail } from "@/features/articles/components";
import { useArticleDetail } from "@/features/articles/queries";
import { CommentsPanel } from "@/shared/components/coments/CommentsPanel";
import { useGetComments } from "@/hooks/useGetComments";
import { usePostComment } from "@/features/comment/mutations";
import { useCommentsModal } from "@/providers/CommentModalProvider";
import { useGetCurrentUser } from "@/hooks";

const ArticleDetailPage: React.FC = () => {
  const params = useParams<{ id: string }>();
  const postId = Number(params?.id);

  const isValidId = Number.isFinite(postId) && postId > 0;
  const { openCommentModal } = useCommentsModal();
  const { data: me } = useGetCurrentUser();
  const addComment = usePostComment(postId);

  const {
    data: article,
    isLoading: isArticleLoading,
    isError: isArticleError,
  } = useArticleDetail(postId);

  const {
    data: comments,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useGetComments(postId, isValidId);

  const onSendComment = (message : string) => {
    addComment.mutate(message)
  }

  if (!isValidId) {
    return (
      <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-sm font-medium text-foreground">Invalid article id</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Please open the article again from the list.
          </p>
        </div>
      </div>
    );
  }

  if (isArticleLoading) {
    return (
      <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="h-6 w-48 rounded-md bg-muted" />
          <div className="h-10 w-full rounded-md bg-muted" />
          <div className="aspect-video w-full rounded-2xl bg-muted" />
          <div className="space-y-3">
            <div className="h-4 w-full rounded bg-muted" />
            <div className="h-4 w-11/12 rounded bg-muted" />
            <div className="h-4 w-10/12 rounded bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  if (isArticleError || !article) {
    return (
      <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-sm font-medium text-foreground">Failed to load article</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full px-4 py-8 sm:px-6 lg:px-50">

        <ArticleDetail article={article} />

        {isCommentsLoading ? (
          <div className="mt-10">
            <div className="h-5 w-40 rounded bg-muted" />
            <div className="mt-4 h-24 w-full rounded-2xl bg-muted" />
            <div className="mt-6 space-y-4">
              <div className="h-16 w-full rounded-2xl bg-muted" />
              <div className="h-16 w-full rounded-2xl bg-muted" />
            </div>
          </div>
        ) : isCommentsError ? (
          <div className="mt-10 rounded-xl border border-border bg-card p-5">
            <p className="text-sm font-medium text-foreground">Failed to load comments</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Please try again later.
            </p>
          </div>
        ) : (
          <div className="mt-10 ">
            <CommentsPanel
              totalCount={comments?.length ?? 0}
              comments={comments ?? []}
              onSend={onSendComment}
              isPending={addComment.isPending}
              currentUser={me}
              previewCount={3}
              onSeeAll={() => { openCommentModal(postId) }}
            />
          </div>
        )}
      </div>
    </>


  );
};

export default ArticleDetailPage;
