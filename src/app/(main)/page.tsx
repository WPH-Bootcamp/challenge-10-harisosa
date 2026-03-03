'use client'

import { PaginationBar } from "@/components/layout/pagination/PaginationBar";
import { ArticleList } from "@/features/articles/components";
import { MostLikedList } from "@/features/home/components";
import { useMostLikedArticles } from "@/features/home/queries/useMostLikedArticles";
import { useRecommendedArticles } from "@/features/home/queries/useRecommendedArticles";
import { useMemo, useState } from "react";

export default function MainPage() {
  const [page, setPage] = useState<number>(1);

  const listQuery = useRecommendedArticles({ page, limit: 5 });
  const mostLikedQuery = useMostLikedArticles();

  const articles = listQuery.data?.data ?? [];
  const mostLikedItems = mostLikedQuery.data?.data ?? [];

  const totalPages = useMemo(() => {
    const lp = listQuery.data?.lastPage;
    return typeof lp === "number" && lp > 0 ? lp : 1;
  }, [listQuery.data?.lastPage]);

  return (
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,1fr)] lg:gap-12">
        <section className="min-w-0">
          {listQuery.isLoading ? (
            <div className="space-y-6">
              <div className="h-6 w-48 rounded bg-muted" />
              <div className="h-40 rounded bg-muted" />
              <div className="h-40 rounded bg-muted" />
            </div>
          ) : listQuery.isError ? (
            <div className="rounded-xl border p-6">
              <p className="text-sm text-muted-foreground">
                Failed to load recommended articles.
              </p>
            </div>
          ) : (
            <>
              <ArticleList title="Recommend For You" articles={articles} />
              <PaginationBar
                className="mt-8"
                page={page}
                totalPages={totalPages}
                onChange={setPage}
              />
            </>
          )}
        </section>

        <section className="min-w-0">
          {mostLikedQuery.isLoading ? (
            <div className="space-y-6">
              <div className="h-6 w-32 rounded bg-muted" />
              <div className="h-28 rounded bg-muted" />
              <div className="h-28 rounded bg-muted" />
            </div>
          ) : mostLikedQuery.isError ? (
            <div className="rounded-xl border p-6">
              <p className="text-sm text-muted-foreground">
                Failed to load most liked articles.
              </p>
            </div>
          ) : (
            <MostLikedList title="Most Liked" items={mostLikedItems} />
          )}
        </section>
      </div>
  );
}
