"use client";

import React, { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { CommentItem } from "@/shared/components/coments/CommentItem";
import { Tabs } from "@/components/ui/tabs";
import { StaticTabItem, StatisticTab } from "@/features/profile/constants";
import { LikeItem } from "@/features/profile/components/LikeItem";
import { useGetComments } from "@/hooks/useGetComments";
import { useGetPostLikes } from "@/features/profile/queries/useGetPostLike";


type StatisticModalProps = {
  open: boolean;
  postId: number;
  onOpenChange: (open: boolean) => void;
};

export const StatisticModal: React.FC<StatisticModalProps> = ({
  open,
  postId,
  onOpenChange,
}) => {
  const [tab, setTab] = useState<StatisticTab>("like");
  const title = useMemo(() => "Statistic", []);

  const { data: comments = [] } = useGetComments(postId, open && postId > 0);
  const { data: likes = [] } = useGetPostLikes(postId, open && postId > 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="lg:w-153.25 max-w-none rounded-2xl p-0">
        <div className="flex items-center justify-between px-5 py-4">
          <DialogTitle className="text-base font-semibold">
            {title}
          </DialogTitle>
        </div>

        <div className="px-5">
          <Tabs<StatisticTab>
            value={tab}
            onChange={setTab}
            items={StaticTabItem}
          />
        </div>

        <div className="max-h-[60vh] overflow-auto px-5 pb-5 pt-3">
          {tab === "like" ? (
            <div className="divide-y">
              {likes.map((like) => (
                <LikeItem key={like.id} user={like} />
              ))}
            </div>
          ) : (
            <ul className="divide-y">
              {comments.map((c) => (
                <CommentItem key={c.id} comment={c} />
              ))}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
