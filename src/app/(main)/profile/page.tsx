"use client";

import { Tabs } from "@/components/ui/tabs";
import { MyPostList, ProfileHeader, ChangePassword, UpdateProfileModal } from "@/features/profile/components";
import { ProfileTab } from "@/features/profile/constants";
import React, { useState } from "react";

const ProfilePage: React.FC = () => {
  const [tab, setTab] = useState<ProfileTab>("posts");
  const [edit, setEdit] = useState<boolean>(false)

  const items = [
  { key: "posts", label: "Your Post" },
  { key: "password", label: "Change Password" },
] satisfies { key: ProfileTab; label: string; }[];

  
  return (
    <>
    <div className="w-full px-4 md:px-8 py-8 lg:px-50">
      <div className="w-full">
        <ProfileHeader onClickEdit={() => setEdit(true)} />
        <div className="mt-6">
          <Tabs<ProfileTab> value={tab} onChange={(value) => setTab(value)} items={items} />
        </div>

        <div className="mt-3">
          {
            tab === "posts" ? <MyPostList /> : <ChangePassword />
          }
        </div>
      </div>
    </div>
      <UpdateProfileModal
        open={edit}
        onClose={() => setEdit(false)}
      />
    </>
  );
};

export default ProfilePage;