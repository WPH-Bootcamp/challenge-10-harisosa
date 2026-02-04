import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="lg:px-30 px-4 pt-24 pb-8 min-h-265">{children}</main>
      <Footer />
    </>
  );
}
