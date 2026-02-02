import React, { useMemo } from "react";
import type { Article } from "@/features/home/types/article";
import { ArticleActions } from "@/features/home/components/ArticleActions";
import { pickFirstParagraphHtml, sanitizeHtml } from "@/utils";

type MostLikedListProps = {
  title: string;
  items: Article[];
};

export const MostLikedList: React.FC<MostLikedListProps> = ({
  title,
  items,
}) => {

  return (
    <aside className="min-w-0">
      <div className="sticky top-6">
        <h2 className="text-xl font-semibold">{title}</h2>

        <div className="mt-6 space-y-6">
          {items.map((it) => {
            const snippetHtml = pickFirstParagraphHtml(it.content);
            return (
              <div
                key={it.id}
                className="border-b pb-6 last:border-b-0 last:pb-0"
              >
                <h3 className="text-sm font-semibold leading-snug">
                  {it.title}
                </h3>

                <div
                  className="mt-2 text-xs leading-relaxed text-muted-foreground prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: snippetHtml }}
                />

                <div className="mt-3">
                  <ArticleActions
                    likes={it.likes}
                    comments={it.comments}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default MostLikedList;
