'use client'

import React, { PropsWithChildren, useMemo } from "react";
import Image from "next/image";
import type { Article } from "@/shared/types";
import { pickFirstParagraphHtml } from "@/utils";
import { useRouter } from "next/navigation";
import { Tags } from "@/features/articles/components/ui/Tags";


interface ArticleCardProps extends PropsWithChildren  {
  article: Article;
};

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, children }) => {
  const router = useRouter();

  const snippetHtml = useMemo(
    () => pickFirstParagraphHtml(article.content),
    [article.content]
  );

  const goToDetail = () => {
    router.push(`/articles/${article.id}`);
  };

  return (
    <>
    <article
      role="link"
      tabIndex={0}
      className="flex flex-col gap-6 border-b pb-8 md:flex-row cursor-pointer"
    >
      <div className="w-full md:w-90">
        <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            sizes="(min-width: 768px) 360px, 100vw"
            className="object-cover" />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="text-xl font-bold leading-snug md:text-xl" onClick={goToDetail}>
          {article.title}
        </h3>
        <Tags tags={article.tags} />
        <div
          className="mt-3 text-sm leading-relaxed text-muted-foreground prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: snippetHtml }} />
        <div className="mt-4 flex flex-col justify-start">
            {children}
        </div>
      </div>
    </article>
    </>
  );
};