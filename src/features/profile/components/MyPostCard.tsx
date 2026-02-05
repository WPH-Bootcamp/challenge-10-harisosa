'use client'


import { Button } from "@/components/ui/button"
import { ArticleCard } from "@/shared/components/article/ArticleCard"
import { Article } from "@/shared/types"
import { dateFormatter } from "@/utils"
import Link from "next/link"


type MyPostCardProps = {
  article: Article,
  onDelete: () => void,
}


export const MyPostCard: React.FC<MyPostCardProps> = ({ article, onDelete }) => {

  return (
    <ArticleCard article={article}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
        <span>Created {dateFormatter(article.createdAt)}</span>
        <span className="opacity-50">|</span>
        <span>Last updated {dateFormatter(article.createdAt)}</span>
      </div>

      <div className="mt-2 flex items-center gap-4 text-xs">
        <Button
          variant="link"
          className="font-medium text-sky-600 underline underline-offset-2"
        >
          Statistic
        </Button>

        <Link
          href={`/posts/${article.id}/edit`}
          className="font-medium text-sky-600 underline underline-offset-2"
        >
          Edit
        </Link>

        <Button
          variant="link"
          onClick={onDelete}
          className="font-medium text-rose-600 underline underline-offset-2"
        >
          Delete
        </Button>
      </div>

    </ArticleCard>)
}