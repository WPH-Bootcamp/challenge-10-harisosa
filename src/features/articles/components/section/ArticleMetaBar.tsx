import { Article } from "../../types"
import { ActionButton, Author } from "../ui"

type ArticleMetaBarProps = {
  article: Article;
}

export const ArticleMetaBar: React.FC<ArticleMetaBarProps> = ({ article }) => {
  return (
    <div className="mt-4 flex flex-col justify-start">
      <Author author={article.author} datePost={article.createdAt} />

      <div onClick={(e) => e.stopPropagation()}>
        <ActionButton
          likes={article.likes}
          comments={article.comments}
        />
      </div>
    </div>
  )
}