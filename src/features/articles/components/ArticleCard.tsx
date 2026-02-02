import React, { useMemo } from "react";
import Image from "next/image";
import type { Article } from "@/features/articles/types/article";
import { ArticleActions } from "@/features/articles/components/ArticleActions";
import { dateFormatter, getInitial, pickFirstParagraphHtml, sanitizeHtml } from "@/utils";

type ArticleCardProps = {
  article: Article;
};


export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
      const snippetHtml = useMemo(
    () => pickFirstParagraphHtml(article.content),
    [article.content]
  );
  
  const safeHtml = useMemo(
    () => sanitizeHtml(article.content),
    [article.content]
  );

  return (
    <article className="flex flex-col gap-6 border-b pb-8 md:flex-row">
      <div className="w-full md:w-90">
        <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            sizes="(min-width: 768px) 360px, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="text-lg font-semibold leading-snug md:text-xl">
          {article.title}
        </h3>

        {article.tags?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border px-3 py-1 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div
        className="mt-3 text-sm leading-relaxed text-muted-foreground prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: snippetHtml }}
        />

        <div className="mt-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="grid h-7 w-7 place-items-center rounded-full bg-muted text-xs font-semibold">
              {getInitial(article.author.name)}
            </div>

            <div>
              <p className="text-sm font-medium">{article.author.name}</p>
              <p className="text-xs text-muted-foreground">
                {dateFormatter(article.createdAt)}
              </p>
            </div>
          </div>

          <ArticleActions
            likes={article.likes}
            comments={article.comments}
          />
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
