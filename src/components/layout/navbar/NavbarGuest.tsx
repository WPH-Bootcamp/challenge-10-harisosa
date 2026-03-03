// src/components/layout/navbar/NavbarGuestActions.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Menu, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type Props = {
  onToggleMobileSearch: () => void;
  onCloseMobileSearch: () => void;
};

export const NavbarGuest: React.FC<Props> = ({
  onToggleMobileSearch,
  onCloseMobileSearch,
}) => {
  return (
    <>
      {/* DESKTOP */}
      <div className="hidden md:flex items-center gap-6">
        <Link
          href="/login"
          className="text-sm font-medium text-sky-600 underline underline-offset-4"
          onClick={onCloseMobileSearch}
        >
          Login
        </Link>

        <Button
          asChild
          className="h-10 rounded-full bg-sky-600 px-10 text-sm font-semibold text-white hover:bg-sky-700"
        >
          <Link href="/register" onClick={onCloseMobileSearch}>
            Register
          </Link>
        </Button>
      </div>

      {/* MOBILE */}
      <div className="flex md:hidden items-center gap-2">
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-gray-100"
          aria-label="Search"
          onClick={onToggleMobileSearch}
        >
          <Search className="h-5 w-5 text-gray-700" />
        </button>

        <Sheet>
          <SheetTrigger asChild>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-gray-100"
              aria-label="Menu"
              onClick={onCloseMobileSearch}
            >
              <Menu className="h-5 w-5 text-gray-700" />
            </button>
          </SheetTrigger>

          <SheetContent side="right" className="w-70">
            <SheetHeader>
              <SheetTitle className="text-sm">Menu</SheetTitle>
            </SheetHeader>

            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/login"
                className="text-sm font-medium text-sky-600 underline underline-offset-4"
              >
                Login
              </Link>

              <Button
                asChild
                className="h-10 rounded-full bg-sky-600 px-6 text-sm font-semibold text-white hover:bg-sky-700"
              >
                <Link href="/register">Register</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};
