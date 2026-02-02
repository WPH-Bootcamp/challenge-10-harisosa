"use client";


import { PaginationBar } from "@/components/layout/pagination/PaginationBar";
import { ArticleList } from "@/features/articles/components/ArticleList";
import { useSearchArticles } from "@/features/search/queries";

import { useSearchParams, useRouter } from "next/navigation";

const LIMIT = 5;

const SearchPage = () => {
  const searhParam = useSearchParams();
  const router = useRouter();

  const queryParam = searhParam.get("q") ?? "";
  const page = Number(searhParam.get("page") ?? "1");

  const query = useSearchArticles({ query:queryParam, page, limit: LIMIT });

  const articles = query.data?.data ?? [];
  const totalPages = query.data?.lastPage ?? 1;

  return (
    <main className="px-4 py-10 sm:px-8 lg:px-16 2xl:px-24">
      <h1 className="text-2xl font-semibold">
        Result for “{queryParam}”
      </h1>

      <div className="mt-8">
        {query.isLoading ? (
          <div className="space-y-4">
            <div className="h-28 rounded bg-muted" />
            <div className="h-28 rounded bg-muted" />
          </div>
        ) : articles.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No results found.
          </p>
        ) : (
          <>
            <ArticleList title="" articles={articles} />
            <PaginationBar
              page={page}
              totalPages={totalPages}
              onChange={(next) =>
                router.push(`/search?q=${queryParam}&page=${next}`)
              }
            />
          </>
        )}
      </div>
    </main>
  );
};

export default SearchPage;
