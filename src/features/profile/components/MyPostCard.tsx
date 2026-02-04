'use client'

import { ArticleCard } from "@/shared/components/article/ArticleCard"
import { Article } from "@/shared/types"
import { dateFormatter } from "@/utils"
import { Link } from "lucide-react"

type MyPostCardProps ={
    article : Article,
    onDelete: () => void,
}


export const MyPostCard : React.FC<MyPostCardProps> = ({ article, onDelete}) => {

    return(      
        <ArticleCard article={article}>
          <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
          <span>Created {dateFormatter(article.createdAt)}</span>
          <span>•</span>
          <span>Last updated {dateFormatter(article.createdAt)}</span>
        </div>

        <div className="mt-2 flex items-center gap-4 text-xs">
          <button type="button" className="text-sky-600 hover:underline">
            Statistic
          </button>
        
          <Link href={`/posts/${article.id}/edit`} className="text-sky-600 hover:underline">
            Edit
          </Link>

          <button type="button" onClick={onDelete} className="text-rose-600 hover:underline">
            Delete
          </button>
        </div>
        </ArticleCard>)
}