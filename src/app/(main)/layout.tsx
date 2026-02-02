import React from "react";
import { Navbar } from "@/components/layout/navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="lg:px-30 px-4">{children}</main>
    </>
  );
}
