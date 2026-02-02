// src/components/layout/navbar/NavbarSearch.tsx
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const NavbarSearch: React.FC<{ mobile?: boolean }> = ({ mobile }) => {
  return (
    <div className={`relative w-full ${mobile ? "" : "max-w-md"}`}>
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <Input
        id={mobile ? "navbar-search-mobile" : undefined}
        placeholder="Search"
        className="h-10 rounded-full border border-gray-200 bg-white pl-11 text-sm shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
};
