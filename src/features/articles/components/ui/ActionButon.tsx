import React from "react";
import { MessageCircle, ThumbsUp } from "lucide-react";

type ActionButtonProps = {
  likes?: number;
  comments?: number;
  onClickLike? : () => void;
  onClickComment? : () => void;
};

export const ActionButton: React.FC<ActionButtonProps> = ({
  likes,
  comments,
  onClickComment,
  onClickLike
}) => {
  return (
    <div className="flex items-center gap-4 text-sm text-muted-foreground">
      <div className="inline-flex items-center gap-2">
        <ThumbsUp className="h-4 w-4" aria-hidden="true"  onClick={onClickLike} />
        <span>{likes ?? 0}</span>
      </div>

      <div className="inline-flex items-center gap-2">
        <MessageCircle className="h-4 w-4" aria-hidden="true" onClick={onClickComment} />
        <span>{comments ?? 0}</span>
      </div>
    </div>
  );
};
