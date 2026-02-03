"use client";

import * as React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export type CommentItem = {
  id: string;
  name: string;
  dateLabel: string; // "27 Maret 2025"
  message: string;
  avatarUrl?: string | null;
};

type CommentsModalProps = {
  totalCount: number;
  comments: CommentItem[];
  onSend: (message: string) => Promise<void> | void;

  /** optional controlled open */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  /** Trigger button label, default: "Comment" */
  triggerLabel?: string;
  className?: string;
};

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase()).join("");
};

export const CommentsModal: React.FC<CommentsModalProps> = ({
  totalCount,
  comments,
  onSend,
  open,
  onOpenChange,
  triggerLabel = "Comment",
  className,
}) => {
  const [draft, setDraft] = React.useState("");
  const [isSending, setIsSending] = React.useState(false);

  const canSend = draft.trim().length > 0 && !isSending;

  const handleSend = async () => {
    if (!canSend) return;

    try {
      setIsSending(true);
      await onSend(draft.trim());
      setDraft("");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className={className}>
          {triggerLabel}
        </Button>
      </DialogTrigger>

      <DialogContent
        className={cn(
          // Desktop: modal besar seperti contoh; Mobile: full-ish
          "w-[calc(100vw-2rem)] sm:max-w-3xl",
          "rounded-2xl p-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5">
          <DialogHeader className="space-y-0">
            <DialogTitle className="text-base font-semibold">
              Comments({totalCount})
            </DialogTitle>
          </DialogHeader>

          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </div>

        <Separator />

        {/* Composer */}
        <div className="px-6 py-5">
          <div className="space-y-2">
            <p className="text-sm font-medium">Give your Comments</p>

            <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
              <Textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Enter your comment"
                className="min-h-[92px] resize-none"
              />

              <Button
                type="button"
                onClick={handleSend}
                disabled={!canSend}
                className="h-11 w-full rounded-full px-10 sm:w-auto"
              >
                {isSending ? "Sending..." : "Send"}
              </Button>
            </div>
          </div>
        </div>

        <Separator />

        {/* List */}
        <ScrollArea className="max-h-[55vh] sm:max-h-[520px]">
          <div className="px-6 py-2">
            {comments.length === 0 ? (
              <div className="py-10 text-center text-sm text-muted-foreground">
                No comments yet.
              </div>
            ) : (
              <ul className="divide-y">
                {comments.map((c) => (
                  <li key={c.id} className="py-5">
                    <div className="flex gap-3">
                      <Avatar className="h-10 w-10">
                        {c.avatarUrl ? (
                          <AvatarImage src={c.avatarUrl} alt={c.name} />
                        ) : null}
                        <AvatarFallback>{getInitials(c.name)}</AvatarFallback>
                      </Avatar>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-1">
                          <p className="text-sm font-semibold leading-none">
                            {c.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {c.dateLabel}
                          </p>
                        </div>

                        <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                          {c.message}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
