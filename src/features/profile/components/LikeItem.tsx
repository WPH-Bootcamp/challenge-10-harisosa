"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PostLikeUser } from "@/features/profile/types";

type LikeItemProps = {
  user: PostLikeUser;
};

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return (first + last).toUpperCase();
};

export const LikeItem: React.FC<LikeItemProps> = ({ user }) => {
  return (
    <div className="flex items-center gap-3 py-3">
      <Avatar className="h-10 w-10">
        <AvatarImage src={user.avatarUrl ?? undefined} alt={user.name} />
        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
      </Avatar>

      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{user.name}</p>
        {user.headline ? (
          <p className="truncate text-xs text-muted-foreground">
            {user.headline}
          </p>
        ) : null}
      </div>
    </div>
  );
};
