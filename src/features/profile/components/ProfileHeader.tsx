"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserModel } from "@/shared/types/user";
import { cn } from "@/lib/utils";


type ProfileHeaderProps = {
  user?: UserModel;
  isCurrentUser?: boolean;
  onClickEdit?: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ onClickEdit, isCurrentUser, user }) => {

  return (
    <div className="w-full flex justify-center">
      <div className={cn(
        "w-full px-6 py-5 flex items-center justify-between",
        isCurrentUser ? "rounded-xl border bg-white" : ""
      )}>
        <div className="flex items-center gap-4">
          <Avatar className="h-[80px] w-[80px]">
            <AvatarImage src={user?.avatarUrl} alt={user?.name} />
            <AvatarFallback>{user?.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>

          <div className="leading-tight">
            <div className="text-lg font-semibold">{user?.name}</div>
            <div className="text-md text-muted-foreground">{user?.headline}</div>
          </div>
        </div>

        {isCurrentUser && (<Button variant="link" className="text-sky-600" onClick={onClickEdit}>
          Edit Profile
        </Button>)}

      </div>
    </div>
  );
};
