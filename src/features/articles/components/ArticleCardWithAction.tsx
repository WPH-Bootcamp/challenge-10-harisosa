'use client'

import React, { useMemo } from "react";
import Image from "next/image";
import type { Article } from "@/shared/types";
import { pickFirstParagraphHtml } from "@/utils";
import { useRouter } from "next/navigation";

import { useCommentsModal } from "@/providers/CommentModalProvider";
import { useLikePost } from "@/features/articles/mutations";
import { ActionButton, Author } from "@/features/articles/components/ui";
import { Tags } from "@/features/articles/components/ui/Tags";
import { ArticleCard } from "@/shared/components/article/ArticleCard";


type ArticleCardWithActionProps = {
  article: Article;
};

export const ArticleCardWithAction: React.FC<ArticleCardWithActionProps> = ({ article }) => {
  const { mutate } = useLikePost();
  const { openCommentModal } = useCommentsModal();
  return (
    <ArticleCard article={article}>
      <Author author={article.author} datePost={article.createdAt} />

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