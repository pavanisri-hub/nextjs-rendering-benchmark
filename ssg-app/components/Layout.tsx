import React, { ReactNode } from "react";
import { Header } from "./Header";

type LayoutProps = {
  children: ReactNode;
  cartCount: number;
};

export function Layout({ children, cartCount }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header cartCount={cartCount} />
      <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}