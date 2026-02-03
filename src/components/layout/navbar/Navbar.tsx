"use client";

import React, { useState } from "react";
import { useAuthUserQuery } from "@/features/auth/queries/useAuthUserQuery";

import { NavbarLogo } from "./NavbarLogo";
import { NavbarSearch } from "./NavbarSearch";
import { NavbarGuest } from "./NavbarGuest";
import { NavbarAuth } from "./NavbarAuth";

export type NavbarUser = {
  name?: string | null;
  avatarUrl?: string | null;
};

export const Navbar: React.FC = () => {
  const { data } = useAuthUserQuery();
  const user: NavbarUser | null = (data as any)?.data ?? (data as any) ?? null;

  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

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
