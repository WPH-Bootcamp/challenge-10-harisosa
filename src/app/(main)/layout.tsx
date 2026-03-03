"use client";

import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { usePathname } from "next/navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isWritePost = pathname === "/write-post";
  const isEditPost = pathname.startsWith("/posts/") && pathname.endsWith("/edit");

  const isEditor = isWritePost || isEditPost;

  const editorTitle = isEditPost ? "Edit Post" : "Write Post";
  return (
    <>
      <Navbar
        mode={isEditor ? "editor" : "default"}
        editorTitle={editorTitle}
      />
      <main className="lg:px-30 px-4 pt-24 pb-8 min-h-265">{children}</main>
      <Footer />
    </>
  );
}
