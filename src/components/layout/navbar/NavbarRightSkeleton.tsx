import React from "react";

export const NavbarRightSkeleton: React.FC = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="h-4 w-16 rounded bg-muted" />
      <div className="h-9 w-9 rounded-full bg-muted" />
      <div className="hidden md:block h-4 w-20 rounded bg-muted" />
    </div>
  );
};
