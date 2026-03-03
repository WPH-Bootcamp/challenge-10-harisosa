import React from "react";
import Link from "next/link";
import Image from "next/image";

export const NavbarLogo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/images/logo.svg"
        alt="Your Logo"
        width={159}
        height={36}
        priority
      />
    </Link>
  );
};
