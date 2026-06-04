import React from "react";

type HeaderProps = {
  cartCount: number;
};

export function Header({ cartCount }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Next.js Product Catalog</h1>
        <div
          data-testid="cart-count"
          className="text-sm font-medium px-3 py-1 rounded-full bg-slate-100"
        >
          Cart: {cartCount}
        </div>
      </div>
    </header>
  );
}