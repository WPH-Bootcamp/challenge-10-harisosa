import React from "react";
import { Tags } from "../ui/Tags";
import { ArticleMetaBar } from "./ArticleMetaBar";
import { Article } from "../../types";

type ArticleDetailHeaderProps = {
  article: Article
};

export const ArticleDetailHeader: React.FC<ArticleDetailHeaderProps> = ({
  article
}) => {
  return (
    <header className="w-full space-y-4">
      <h1 className="text-balance text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
        {article.title}
      </h1>
      <div className="flex flex-wrap items-center gap-2">
        <Tags tags={article.tags} />
      </div>
      <ArticleMetaBar article={article} />
    </header>
  );
};
