import { dateFormatter, getInitial } from "@/utils"
import { ArticleAuthor } from "../../types"

type AuthorProps = {
    author : ArticleAuthor,
    datePost: string
}

export const Author: React.FC<AuthorProps> = ({author,datePost}) => {
    return (
        <div className="flex h-15.25 items-center gap-2">
            <div className="grid h-7 w-7 place-items-center rounded-full bg-muted text-xs font-semibold">
                                  {getInitial(author.name)}
            </div>
            <div className="flex items-center gap-2 text-sm leading-5">
                <span className="font-normal text-gray-900">
                    {author.name}
                </span>

                <span className="h-0.75 w-0.75 rounded-full bg-gray-300"></span>

                <span className="font-normal text-gray-500">
                    {dateFormatter(datePost)}
                </span>
            </div>
        </div>
    )
}