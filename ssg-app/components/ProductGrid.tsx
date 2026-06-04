import React from "react";
import { Product, ProductCard } from "./ProductCard";

type ProductGridProps = {
  products: Product[];
  onAddToCart?: () => void;
};

export function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}