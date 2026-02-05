'use client'

import React from "react";
import type { Article } from "@/shared/types";

import { useCommentsModal } from "@/providers/CommentModalProvider";
import { useLikePost } from "@/features/articles/mutations";
import { ActionButton, AuthorComponent } from "@/features/articles/components/ui";
import { ArticleCard } from "@/shared/components/article/ArticleCard";


type ArticleCardWithActionProps = {
  article: Article;
};

export const ArticleCardWithAction: React.FC<ArticleCardWithActionProps> = ({ article }) => {
  const { mutate } = useLikePost();
  const { openCommentModal } = useCommentsModal();
  return (
    <ArticleCard article={article}>
      <AuthorComponent author={article.author} datePost={article.createdAt} />

      <div onClick={(e) => e.stopPropagation()}>
        <ActionButton
          likes={article.likes}
          comments={article.comments}
          onClickComment={() => openCommentModal(article.id)}
          onClickLike={() => mutate(article.id)
          }
        />
      </div>
    </ArticleCard>
  );
};