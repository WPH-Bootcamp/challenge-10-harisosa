import { ArticleCardWithAction } from "@/shared/components/article/ArticleCardWithAction";
import { Article } from "@/shared/types";
import React from "react";

type ArticleListProps = {
  title: string;
  articles: Article[];
};

export const ArticleList: React.FC<ArticleListProps> = ({ title, articles }) => {
  return (
    <section className="min-w-0">
      <h2 className="text-xl font-semibold">{title}</h2>

      <div className="mt-6 space-y-8">
        {articles.map((a) => (
          <ArticleCardWithAction key={String(a.id)} article={a} />
        ))}
      </div>
    </section>
  );
};
