import React from "react";
import { MessageCircle, ThumbsUp } from "lucide-react";

type ArticleActionsProps = {
  likes?: number;
  comments?: number;
};

export const ArticleActions: React.FC<ArticleActionsProps> = ({
  likes,
  comments,
}) => {
  return (
    <div className="flex items-center gap-4 text-sm text-muted-foreground">
      <div className="inline-flex items-center gap-2">
        <ThumbsUp className="h-4 w-4" aria-hidden="true" />
        <span>{likes ?? 0}</span>
      </div>

      <div className="inline-flex items-center gap-2">
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        <span>{comments ?? 0}</span>
      </div>
    </div>
  );
};
