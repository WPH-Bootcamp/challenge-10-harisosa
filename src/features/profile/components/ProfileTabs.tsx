"use client";

import React from "react";

export type ProfileTab = "posts" | "password";

type ProfileTabsProps = {
  tab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
};

export const ProfileTabs: React.FC<ProfileTabsProps> = ({ tab, onTabChange }) => {
  return (
    <div className="flex justify-center">
      <div className="w-full">
        <div className="flex items-center gap-10 text-sm">
          <button
            type="button"
            onClick={() => onTabChange("posts")}
            className={[
              "pb-2 transition-colors",
              tab === "posts"
                ? "text-sky-600 border-b-2 border-sky-600"
                : "text-muted-foreground hover:text-foreground",
            ].join(" ")}
          >
            Your Post
          </button>

          <button
            type="button"
            onClick={() => onTabChange("password")}
            className={[
              "pb-2 transition-colors",
              tab === "password"
                ? "text-sky-600 border-b-2 border-sky-600"
                : "text-muted-foreground hover:text-foreground",
            ].join(" ")}
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};
