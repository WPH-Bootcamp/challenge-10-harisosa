"use client";

import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useMyPosts } from "@/features/profile/queries/useMyPosts";
import { MyPostCard } from "@/features/profile/components/MyPostCard";
import { PaginationBar } from "@/components/layout/pagination/PaginationBar";
import EmptyState from "@/components/layout/empty-state/EmptyState";
import { Article } from "@/shared/types";
import { PenLine } from "lucide-react";

type MyPostListProps = {
  onDeleteClick: (postId: number) => void;
};

export const MyPostList: React.FC<MyPostListProps> = ({ onDeleteClick }) => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const {data : articles, isLoading, isError} = useMyPosts({ page, limit });

  const posts = useMemo(() => {
    return articles?.data ?? [];
  }, [articles]);

  const totalPages = useMemo(() => {
    return articles?.total ?? 1;
  }, [articles]);

  return (
    <div className="flex justify-center">
      <div className="w-full">
        <div className="mt-6 w-full">
          {isLoading ? (
            <div className="text-sm text-muted-foreground">Loading...</div>
          ) : isError ? (
            <div className="text-sm text-rose-600">Failed to load posts.</div>
          ) : posts.length === 0 ? (
            <EmptyState
              title="Your writing journey starts here"
              img="/images/search-empty.svg"
              description="No posts yet, but every great writer starts with the first one"
            >
              <Button
                type="button"
                onClick={() => { }}
                className="mt-7 h-11 rounded-full bg-sky-600 px-7 py-3 text-sm font-medium text-white hover:bg-sky-700"
              >
                <span className="flex items-center gap-2">
                  <PenLine className="h-4 w-4" />
                  Write Post
                </span>
              </Button>
            </EmptyState>
          ) : (
            <>
              <div className="flex flex-col gap-6">
                {posts.map((p: Article) => (
                  <MyPostCard
                    key={p.id}
                    article={p}
                    onDelete={() => onDeleteClick(p.id)}
                  />
                ))}
              </div>

              <PaginationBar
                className="mt-8"
                page={page}
                totalPages={totalPages}
                onChange={setPage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
