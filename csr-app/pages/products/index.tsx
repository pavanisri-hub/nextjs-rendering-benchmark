import React, { useEffect, useMemo, useState } from "react";
import { Layout } from "../../components/Layout";
import { Product } from "../../components/ProductCard";
import { ProductGrid } from "../../components/ProductGrid";

type ProductsResponse = {
  products: Product[];
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await fetch("https://dummyjson.com/products?limit=20");
        const data: ProductsResponse = await res.json();
        setProducts(data.products);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const term = search.toLowerCase();
    return products.filter((p) => p.title.toLowerCase().includes(term));
  }, [products, search]);

  return (
    <Layout cartCount={cartCount}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Products (CSR)</h2>
        <input
          data-testid="search-input"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="border border-slate-300 rounded-md px-3 py-1.5 text-sm w-full max-w-xs"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-slate-200 rounded-lg h-52 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <ProductGrid
          products={filteredProducts}
          onAddToCart={() => setCartCount((c) => c + 1)}
        />
      )}
    </Layout>
  );
}