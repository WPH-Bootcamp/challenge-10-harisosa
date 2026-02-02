import React from "react";

type NavbarAvatarProps = {
  name: string;
  avatarUrl?: string | null;
};

export const NavbarAvatar: React.FC<NavbarAvatarProps> = ({
  name,
  avatarUrl,
}) => {
  const initial = (name?.trim()?.[0] || "U").toUpperCase();

  return (
    <div className="h-9 w-9 overflow-hidden rounded-full border bg-muted">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={name}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-muted-foreground">
          {initial}
        </div>
      )}
    </div>
  );
};
