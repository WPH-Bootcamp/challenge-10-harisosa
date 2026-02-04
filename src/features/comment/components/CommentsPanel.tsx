"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CommentModel } from "../types/comment";
import { dateFormatter, getInitial } from "@/utils";
import { CurrentUser } from "../types/user";

type CommentsPanelProps = {
  totalCount: number;
  comments: CommentModel[];
  onSend: (message: string) => Promise<void> | void;
  withoutAvatar?: boolean;
  isPending?: boolean;
  currentUser?: CurrentUser;
  previewCount?: number;
  onSeeAll?: () => void;
  seeAllLabel?: string;

  className?: string;
};

export const CommentsPanel: React.FC<CommentsPanelProps> = ({
  totalCount,
  comments,
  onSend,
  withoutAvatar,
  isPending = false,
  currentUser,
  previewCount,
  onSeeAll,
  seeAllLabel = "See All Comments",
  className,
}) => {
  const [draft, setDraft] = React.useState("");

  const canSend = draft.trim().length > 0 && !isPending;

  const visibleComments =
    typeof previewCount === "number" ? comments.slice(0, previewCount) : comments;

  const handleSend = async () => {
    if (!canSend) return;

    await onSend(draft.trim());
    setDraft("");
  };

  return (
    <section className={cn("w-full", className)}>
      <div className="py-4">
        <h3 className="text-base font-semibold">Comments({totalCount})</h3>
      </div>

      {currentUser && !withoutAvatar ? (
        <div className="flex items-center gap-2 pb-3">
          <Avatar className="h-10 w-10">
            {currentUser.avatarUrl ? (
              <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
            ) : null}
            <AvatarFallback>{getInitial(currentUser.name)}</AvatarFallback>
          </Avatar>
          <p className="text-sm font-medium">{currentUser.name}</p>
        </div>
      ) : null}

      <div className="space-y-2">
        <p className="text-sm font-medium">Give your Comments</p>

        <div className="space-y-3">
          <Textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Enter your comment"
            className="min-h-23 resize-none"
            disabled={isPending}
          />

          <div className="flex justify-end">
            <Button
              type="button"
              onClick={handleSend}
              disabled={!canSend}
              className="h-10 rounded-full px-10 bg-primary-300"
            >
              {isPending ? "Sending..." : "Send"}
            </Button>
          </div>
        </div>
      </div>

      <Separator className="my-5" />

      {visibleComments.length === 0 ? (
        <div className="py-8 text-center text-sm text-muted-foreground">
          No comments yet.
        </div>
      ) : (
        <ul className="divide-y max-h-137 overflow-auto">
          {visibleComments.map((c) => (
            <li key={c.id} className="py-4">
              <div className="flex gap-3">
                <Avatar className="h-9 w-9">
                  {c.author.avatarUrl ? (
                    <AvatarImage src={c.author.avatarUrl} alt={c.author.name} />
                  ) : null}
                  <AvatarFallback>{getInitial(c.author.name)}</AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold leading-none">
                    {c.author.name}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {dateFormatter(c.createdAt)}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                    {c.content}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {onSeeAll ? (
        <div className="pt-3">
          <button
            type="button"
            onClick={onSeeAll}
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            {seeAllLabel}
          </button>
        </div>
      ) : null}
    </section>
  );
};
