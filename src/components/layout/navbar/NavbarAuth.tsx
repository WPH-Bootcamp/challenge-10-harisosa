// src/components/layout/navbar/NavbarAuthedActions.tsx
"use client";

import React from "react";
import Link from "next/link";
import { PencilLine, User, LogOut, Search } from "lucide-react";

import type { NavbarUser } from "./Navbar";
import { NavbarAvatar } from "./NavbarAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  user: NavbarUser;
  onToggleMobileSearch: () => void;
  onCloseMobileSearch: () => void;
};

export const NavbarAuth: React.FC<Props> = ({
  user,
  onToggleMobileSearch,
  onCloseMobileSearch,
}) => {
  const displayName = user?.name || "John Doe";

  return (
    <>
      <div className="hidden md:flex items-center gap-6">
        <Link
          href="/write"
          className="inline-flex items-center gap-2 text-sm font-medium text-sky-600 hover:underline"
        >
          <PencilLine className="h-4 w-4" />
          <span>Write Post</span>
        </Link>

        <div className="h-5 w-px bg-gray-200" />

        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <div className="flex items-center gap-2">
              <NavbarAvatar name={displayName} avatarUrl={user?.avatarUrl} />
              <span className="text-sm text-gray-900">{displayName}</span>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex md:hidden items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none" onClick={onCloseMobileSearch as any}>
            <NavbarAvatar name={displayName} avatarUrl={user?.avatarUrl} />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};
