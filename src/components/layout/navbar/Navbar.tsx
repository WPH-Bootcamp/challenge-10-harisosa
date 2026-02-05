"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { NavbarLogo } from "./NavbarLogo";
import { NavbarSearch } from "./NavbarSearch";
import { NavbarGuest } from "./NavbarGuest";
import { NavbarAuth } from "./NavbarAuth";
import { useGetCurrentUser } from "@/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type NavbarUser = {
  name?: string | null;
  avatarUrl?: string | null;
};

type NavbarMode = "default" | "editor";

type NavbarProps = {
  mode?: NavbarMode;  
  editorTitle?: "Write Post" | "Edit Post";
};

export const Navbar: React.FC<NavbarProps> = ({
  mode = "default",
  editorTitle = "Write Post",
}) => {
  const router = useRouter();

  const { data: user } = useGetCurrentUser();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  if (mode === "editor") {
    const name = user?.name ?? "User";

    return (
      <header className="w-full bg-white fixed top-0 z-50">
        <div className="px-3 py-3 md:px-30 md:py-4">
          <div className="flex min-h-11 items-center justify-between">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center gap-2 text-sm font-medium hover:opacity-80"
            >
              <ArrowLeft className="h-4 w-4" />
              {editorTitle}
            </button>

            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.avatarUrl ?? undefined} alt={name} />
              <AvatarFallback className="text-xs">
                {name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="h-px w-full bg-gray-100" />
      </header>
    );
  }

  

  const toggleMobileSearch = () => setMobileSearchOpen((v) => !v);
  const closeMobileSearch = () => setMobileSearchOpen(false);

  return (
    <header className="w-full bg-white fixed top-0 z-50">
      <div className="px-3 py-3 md:px-30 md:py-4">
        <div className="flex min-h-11 items-center justify-between">
          <NavbarLogo />

          <div className="hidden md:flex w-94.25 justify-center px-10">
            <NavbarSearch />
          </div>

          <div className="flex items-center">
            {user ? (
              <NavbarAuth
                user={user}
                onToggleMobileSearch={toggleMobileSearch}
                onCloseMobileSearch={closeMobileSearch}
              />
            ) : (
              <NavbarGuest
                onToggleMobileSearch={toggleMobileSearch}
                onCloseMobileSearch={closeMobileSearch}
              />
            )}
          </div>
        </div>

        <div className={`${mobileSearchOpen ? "mt-3" : "hidden"} md:hidden`}>
          <NavbarSearch mobile />
        </div>
      </div>

      <div className="h-px w-full bg-gray-100" />
    </header>
  );
};
