"use client";

import React from "react";
import { ArticleDetailHeader } from "./section/ArticleDetailHeader";
import { ArticleDetailHero } from "./section/ArticleDetailHero";
import { sanitizeHtml } from "@/utils";
import { Article } from "../types";


type ArticleDetailProps = {
  article: Article;
};

export const ArticleDetail: React.FC<ArticleDetailProps> = ({ article }) => {


  return (

    <div className="w-full space-y-8">
      <ArticleDetailHeader article={article}
      />

      <ArticleDetailHero src={article.imageUrl} alt={article.title} />


      <article className="w-full whitespace-pre-wrap wrap-break-word text-sm leading-relaxed text-foreground sm:text-base">
        <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(article.content) }} />
      </article>
    </div>
  );
};
