import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { CommentModel } from "@/features/comment/types"
import { dateFormatter, getInitial } from "@/utils"


type CommentItemProps = {
  comment: CommentModel;
}

export const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  return (
    <li className="py-4">
      <div className="flex gap-3">
        <Avatar className="h-9 w-9">
          {comment.author.avatarUrl ? (
            <AvatarImage src={comment.author.avatarUrl} alt={comment.author.name} />
          ) : null}
          <AvatarFallback>{getInitial(comment.author.name)}</AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold leading-none">
            {comment.author.name}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {dateFormatter(comment.createdAt)}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/90">
            {comment.content}
          </p>
        </div>
      </div>
    </li>
  )
}