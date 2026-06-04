import React, { useMemo, useState } from "react";
import { GetStaticProps } from "next";
import { Layout } from "../../components/Layout";
import { Product } from "../../components/ProductCard";
import { ProductGrid } from "../../components/ProductGrid";

type ProductsResponse = {
  products: Product[];
};

type ProductsPageProps = {
  products: Product[];
};

export const getStaticProps: GetStaticProps<ProductsPageProps> = async () => {
  const res = await fetch("https://dummyjson.com/products?limit=20");
  const data: ProductsResponse = await res.json();

  return {
    props: {
      products: data.products,
    },
    revalidate: 60, // ISR: re-generate at most once every 60s
  };
};

export default function ProductsPage({ products }: ProductsPageProps) {
  const [cartCount, setCartCount] = useState(0);
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    const term = search.toLowerCase();
    return products.filter((p) => p.title.toLowerCase().includes(term));
  }, [products, search]);

  return (
    <Layout cartCount={cartCount}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Products (SSG + ISR 60s)</h2>
        <input
          data-testid="search-input"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="border border-slate-300 rounded-md px-3 py-1.5 text-sm w-full max-w-xs"
        />
      </div>

      <ProductGrid
        products={filteredProducts}
        onAddToCart={() => setCartCount((c) => c + 1)}
      />
    </Layout>
  );
}