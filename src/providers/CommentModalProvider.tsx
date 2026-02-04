"use client";

import { CommentsModal } from "@/features/comment/components/CommentModal";
import * as React from "react";

type CommentsModalUI = {
  openCommentModal: (postId: number) => void;
  close: () => void;
};

const CommentsModalUIContext = React.createContext<CommentsModalUI | null>(null);

export const CommentsModalProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [open, setOpen] = React.useState(false);
  const [postId, setPostId] = React.useState<number | null>(null);

  const openCommentModal = React.useCallback((id: number) => {
    setPostId(id);
    setOpen(true);
  }, []);

  const close = React.useCallback(() => {
    setOpen(false);
    setPostId(null);
  }, []);

  const value = React.useMemo(() => ({ openCommentModal, close }), [openCommentModal, close]);

  return (
    <CommentsModalUIContext.Provider value={value}>
      {children}

      <CommentsModal
        postId={postId}
        open={open}
        onOpenChange={(next) => {
          if (!next) close();
          else setOpen(true);
        }}
      />
    </CommentsModalUIContext.Provider>
  );
};

export const useCommentsModal = (): CommentsModalUI => {
  const ctx = React.useContext(CommentsModalUIContext);
  if (!ctx) throw new Error("useCommentsModal must be used within CommentsModalHost");
  return ctx;
};
