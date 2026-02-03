"use client";

import React from "react";
import { ArticleDetailHeader } from "./section/ArticleDetailHeader";
import { ArticleDetailHero } from "./section/ArticleDetailHero";
import { useArticleDetail } from "../queries";
import { sanitizeHtml } from "@/utils";


type Props = {
  id: string;
};

export const ArticleDetail: React.FC<Props> = ({ id }) => {
  const { data, isLoading, isError } = useArticleDetail(Number(id));
  if (isLoading) {
    return (
      <div className="w-full px-80 py-8 sm:px-6 lg:px-8">
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

  if (isError || !data) {
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
    <div className="w-full px-4 py-8 sm:px-6 lg:px-80">
      <div className="w-full space-y-8">
        <ArticleDetailHeader article={data}
        />

        <ArticleDetailHero src={data.imageUrl} alt={data.title} />


    <article className="w-full whitespace-pre-wrap wrap-break-word text-sm leading-relaxed text-foreground sm:text-base">
      <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(data.content) }} />
    </article>
      </div>
    </div>
  );
};
