import React from "react";
import Link from "next/link";

export type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

type ProductCardProps = {
  product: Product;
  onAddToCart?: () => void;
};

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div
      data-testid="product-item"
      className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden flex flex-col"
    >
      <Link href={`/products/${product.id}`} className="block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-40 object-cover"
        />
      </Link>
      <div className="p-3 flex-1 flex flex-col">
        <Link href={`/products/${product.id}`} className="flex-1">
          <h2 className="text-sm font-semibold mb-1" data-testid="product-card-title">
            {product.title}
          </h2>
        </Link>
        <p className="text-sm font-medium mb-2">${product.price}</p>
        <button
          type="button"
          data-testid="add-to-cart-btn"
          onClick={onAddToCart}
          className="mt-auto inline-flex items-center justify-center rounded-md bg-slate-900 text-white text-xs px-2.5 py-1.5 hover:bg-slate-800 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}