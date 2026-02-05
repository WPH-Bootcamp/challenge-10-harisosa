"use client";

import { MyPostList, ProfileHeader, ProfileTab, ProfileTabs, ChangePassword, UpdateProfileModal } from "@/features/profile/components";
import React, { useState } from "react";

const ProfilePage: React.FC = () => {
  const [tab, setTab] = useState<ProfileTab>("posts");
  const [edit, setEdit] = useState<boolean>(false)
  return (
    <><div className="w-full px-4 md:px-8 py-8 lg:px-50">
      <div className="w-full">
        <ProfileHeader onClickEdit={() => setEdit(true)} />
        <div className="mt-6">
          <ProfileTabs tab={tab} onTabChange={setTab} />
        </div>

        <div className="mt-6">
          {
            tab === "posts" ? <MyPostList onDeleteClick={() => { }} /> : <ChangePassword />
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