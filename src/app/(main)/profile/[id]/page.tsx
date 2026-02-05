"use client";

import React, { useMemo, useState } from "react";
import { ProfileHeader } from "@/features/profile/components";
import { useParams } from "next/navigation";
import { useGetUserById } from "@/features/profile/queries/useGetProfileById";
import EmptyState from "@/components/layout/empty-state/EmptyState";
import { ArticleCardWithAction } from "@/shared/components/article/ArticleCardWithAction";
import { Article } from "@/shared/types";
import { useGetPostsByUser } from "@/features/profile/queries/useGetPostByUserId";
import { PaginationBar } from "@/components/layout/pagination/PaginationBar";


const UserProfilePage: React.FC = () => {
  const params = useParams<{ id: string }>();
  const userId = Number(params?.id);
  const limit = 10;
  const [page, setPage] = useState(1);
  const { data: user } = useGetUserById(userId);
  const { data: articles, isLoading, isError } = useGetPostsByUser(userId, page, limit);

  const posts = useMemo(() => {
    return articles?.data ?? [];
  }, [articles]);

const totalPages = useMemo(() => {
  if (!articles) return 1;
  if (!articles.total || !limit) return 1;
  return Math.ceil(articles.total / limit);
}, [articles]);

  return (
    <>
      <div className="w-full px-4 md:px-8 py-8 lg:px-50">
        <div className="w-full">
          <ProfileHeader user={user} />


          <div className="mt-3">
            <div className="flex justify-center">
              <div className="w-full">
                <div className="mt-3 w-full">
                  {isLoading ? (
                    <div className="text-sm text-muted-foreground">Loading...</div>
                  ) : isError ? (
                    <div className="text-sm text-rose-600">Failed to load posts.</div>
                  ) : posts.length === 0 ? (
                    <EmptyState
                      title="Your writing journey starts here"
                      img="/images/search-empty.svg"
                      description="No posts yet, but every great writer starts with the first one"
                    />

                  ) : (
                    <>
                      <div className="flex flex-col gap-6 ">
                        <div className="flex w-full border-b border-border pb-3 items-center">
                          <div className="flex items-center justify-between w-full ">
                            <h2 className="text-lg font-semibold">{articles?.total} Post</h2>
                          </div>
                          <span className="absolute left-0 bottom-0 h-0.5 w-16 bg-primary" />
                        </div>
                        {posts.map((p: Article) => (
                          <ArticleCardWithAction
                            key={p.id}
                            article={p}
                          />
                        ))}
                      </div>

                      <PaginationBar
                        className="mt-8"
                        page={page}
                        totalPages={totalPages}
                        onChange={setPage} />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;