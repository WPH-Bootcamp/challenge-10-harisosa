import React from "react";
import { Article } from "@/shared/types";
import { useLikePost } from "@/features/articles/mutations";
import { ActionButton, AuthorComponent } from "@/features/articles/components/ui";
import { Tags } from "@/features/articles/components/ui/Tags";

type ArticleDetailHeaderProps = {
  article: Article
};

export const ArticleDetailHeader: React.FC<ArticleDetailHeaderProps> = ({
  article
}) => {
  const { mutate } = useLikePost();
  return (
    <header className="w-full space-y-4">
      <h1 className="text-balance text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
        {article.title}
      </h1>
      <div className="flex flex-wrap items-center gap-2">
        <Tags tags={article.tags} />
      </div>
      <div className="mt-4 flex flex-col justify-start">
        <AuthorComponent author={article.author} datePost={article.createdAt} />

        <div onClick={(e) => e.stopPropagation()}>
          <ActionButton
            likes={article.likes}
            comments={article.comments} 
            onClickLike={()=> mutate(article.id)}
            />
        </div>
      </div>
    </header>
  );
};
