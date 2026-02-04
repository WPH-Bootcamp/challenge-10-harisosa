"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import { CommentsPanel } from "./CommentsPanel";
import { useGetComments } from "../queries/useGetComments";

import { usePostComment } from "../mutations";
import { useAuthUserQuery } from "@/features/auth/queries";

type CommentsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postId: number | null;
};

export const CommentsModal: React.FC<CommentsModalProps> = ({
  open,
  onOpenChange,
  postId,

}) => {
  const enabled = open && !!postId && postId > 0;

  const {data: currentUser} = useAuthUserQuery();
  const {
    data: comments = [],
    isLoading,
    isError,
  } = useGetComments(postId ?? 0, enabled);

  const addComment = usePostComment(postId ?? 0);

  const handleSend = async (message: string) => {
    if (!postId) return;
    await addComment.mutateAsync(message); // sukses -> invalidate -> reload comments
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[min(95vw,48rem)] max-w-none rounded-2xl p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Comments</DialogTitle>
          <DialogDescription>Comments for this post.</DialogDescription>
        </DialogHeader>

        <ScrollArea className="w-full max-h-[80vh] px-6 pb-6">
          <div className="w-full">
            {isLoading ? (
              <div className="py-10 text-sm text-muted-foreground">
                Loading comments...
              </div>
            ) : isError ? (
              <div className="py-10 text-sm text-destructive">
                Failed to load comments.
              </div>
            ) : (
              <CommentsPanel
                totalCount={comments.length}
                comments={comments}
                onSend={handleSend}
                withoutAvatar={true}
                isPending={addComment.isPending}
                currentUser={currentUser}
              />
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
